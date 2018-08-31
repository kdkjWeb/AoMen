<template>
    <div id="build">
        <!-- 返回 -->
        <goBack :isAdd="true" @add="add"></goBack>
        <!-- 返回 -->
        <!-- 新建彈出框 -->
        <el-dialog :visible.sync="dialogFormNewVisible" width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                <el-form-item label="姓名：" prop="name" clearbale>
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="電話：" prop="tel">
                    <el-input v-model="ruleForm.tel" oninput="if(value.length > 11)value = value.slice(0, 11)"></el-input>
                </el-form-item>
                <el-form-item label="賬號：" prop="account" >
                    <el-input v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密碼：" v-show="isUpdate">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item style="position:relative"  v-show="isNew">
                    <div class="pas">
                        <em style="color:red">*</em>
                        <label>密碼：</label>
                    </div>
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" v-show="isNew">確 認</el-button>
                    <el-button type="primary" @click="updateForm('ruleForm')" v-show="isUpdate">確 认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 新建彈出框 -->
        <!-- 列表 -->
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            header-align = "center"
            v-for="(item,index) in tableList"
            :key="index"
            :prop="item.prop"
            :label="item.label">
            </el-table-column>
            <el-table-column
            header-align = "center"
            prop="detail"
            label="操作"
            width="200px">
            <template slot-scope="scope">
                <el-button round @click="update(scope.row)" type="warning" plain style="border-color:#f99e1b;">修改</el-button>
                <el-button round @click="delet(scope.row)" type="danger" plain>刪除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 列表 -->
        <!-- 分頁 -->
        <div class="block">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total" 
            style="margin-top:10px">
            </el-pagination>
        </div>
        <!-- 列表 -->
    </div>
</template>

<script>
import goBack from "./../../components/goBack"

export default {
    name:"bulid",
    components:{
        goBack,
    },
    data(){
        return{
            dialogFormNewVisible:false,
            isNew:true,
            isUpdate:false,
            tableData: [],
            tableList:[
                {prop:"realName",label:"姓名",width:''},
                {prop:"phoneExt",label:"電話",width:''},
                {prop:"phone",label:"賬號",width:''},
            ],
            ruleForm:{
                name: "",
                tel: "",
                account: "",
                pass: "",
                oldPass: "",
                newPass: "",
                confirm: ""
            },
            rules:{
                name:[
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { pattern:/^[\u0391-\uFFE5A-Za-z]+$/, message: '無效的姓名', trigger: 'blur' },
                ],
                tel:[
                    {required: true, message: '请输入電話', trigger: 'blur' },
                    { pattern: /^[1][3456789][0-9]{9}|^\d{8}$/, message: '無效的電話', trigger: 'blur' },
                ],
                account:[
                    {required: true, message: '请输入賬號', trigger: 'blur' },
                    { pattern: /^[^\u4e00-\u9fa5]+$/, message: '無效的帐號', trigger: 'blur' },
                    { min: 8, max: 20, message: '请确保帐號长度在8-20位之间', trigger: 'blur' }
                ]
            },
            currentPage: 1,
            pageSize:10,
            total:null,
        }
    },
    mounted(){
        this.getUserlistByAdmin()
    },
    methods:{
        // 獲取所有列表信息
        getUserlistByAdmin(currentPage){
            this.$get("admin/getUsersAdminList",{
                pageNum: this.currentPage ? this.currentPage : 1,
                pageSize: this.pageSize
            }).then(res=>{
                if(res.code == 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                }
            })
        },
        // 點擊新建按鈕出現彈框
        add(){
            this.dialogFormNewVisible = true;
            this.isUpdate = false;
            this.isNew = true;
            this.ruleForm.name = "";
            this.ruleForm.account = "";
            this.ruleForm.tel = "";
            this.ruleForm.password = "";
        },
        // 確認新建人員
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,20}$/.test(this.ruleForm.password))){
                        this.$message.error("密碼必須由数字、字母或下劃線（_）組合而成，且長度在8-20位之間")
                    }else{
                        this.$post("admin/addOneAdmin",{
                            realName: this.ruleForm.name,
                            phone: this.ruleForm.account,
                            phoneExt: this.ruleForm.tel,
                            password: this.ruleForm.password
                        }).then(res =>{
                            if(res.code === 0){
                                this.$message({
                                    message:"添加成功",
                                    type:"success"
                                })
                                this.dialogFormNewVisible = false;
                                this.getUserlistByAdmin()
                            }else if(res.msg == 401){
                                this.$message.error("無法新建，電話號碼格式有誤")
                            }
                            else{
                                this.$message.error("此賬號已被人注冊，請重新輸入")
                            }
                        })
                    }
                } else {
                    this.$message.error("請確認所填寫的數據")
                    return false;
                }
            });
        },
        // 修改
        update(val){
            this.dialogFormNewVisible  = true;
            this.isNew = false;
            this.isUpdate = true;
            //數據回顯
            this.id = val.id
            this.ruleForm.name = val.realName;
            this.ruleForm.tel = val.phoneExt;
            this.ruleForm.account = val.phone;
        },
        updateForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                     if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,20}$/.test(this.ruleForm.password))){
                        this.$message.error("密碼必須由数字、字母或下劃線（_）組合而成，且長度在8-20位之間")
                    }else{
                        this.$post("admin/edit",{
                            id: this.id,
                            realName: this.ruleForm.name,
                            phone: this.ruleForm.account,
                            phoneExt: this.ruleForm.tel,
                            password: this.ruleForm.password
                        }).then(res =>{
                            if(res.code === 0){
                                this.$message({
                                    message:"修改成功",
                                    type:"success"
                                })
                                this.ruleForm.password = "";
                                this.dialogFormNewVisible = false;
                                this.getUserlistByAdmin();
                            }else{
                                this.$message.error("無法修改");
                            }
                        })
                    }
                } else {
                    this.$message.error("請確認所填寫的數據")
                    return false;
                }
            });
        },
        // 刪除
        delet(val,index){
            this.$confirm('此操作將永久刪除該數據, 是否繼續?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$get("admin/del/" + val.id).then(res=>{
                        if(res.code == 0){
                            this.tableData.splice(index,1)
                            this.$message({
                                type: 'success',
                                message: '刪除成功!'
                            });
                            this.getUserlistByAdmin()
                        }else{
                            this.$message.error("刪除失敗！不允许删除自己！")
                        }
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消刪除'
                });          
            });
        },
        // 分頁
        handleCurrentChange(val){
            this.currentPage = val;
            this.getUserlistByAdmin(this.currentPage)
        }
    }
}
</script>

<style>
    #build .el-table .cell{
        height: 36px !important;
        display: flex;
        justify-content: space-around;
        line-height: 35px;
    }

</style>
<style scoped>

.el-button--primary{
    width:90%;
    background-color: #f99e1b;
    border-color:#f99e1b;
}
.pas{
    position: absolute;
    top:0;
    left:-65px;
    z-index: 1000
}
.block{
    width: 100%;
    height: 50px;
    background-color: #fff;
}
.el-pagination{
    float: right;
}
.el-pagination button, .el-pagination span:not([class*=suffix]),.el-pager li,.el-pagination__editor.el-input .el-input__inner{
    height: 40px !important;
    line-height: 40px;
    font-size: 16px;
}
.el-pagination .el-select .el-input .el-input__inner{
    height: 43px !important;
    font-size: 16px;
}
</style>


