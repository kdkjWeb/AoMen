<template>
    <div>
        <goBack :isAdd="true" @add="add"></goBack>
        <el-dialog :visible.sync="dialogFormNewVisible" width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="電話：" prop="tel">
                    <el-input v-model="ruleForm.tel" oninput="if(value.length > 11)value = value.slice(0, 11)"></el-input>
                </el-form-item>
                <el-form-item label="賬號：" prop="account">
                    <el-input v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密碼：" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">確 認</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            height="600">
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
            label="操作">
            <template slot-scope="scope">
                <el-button round id="update" @click="update">修改</el-button>
                <el-button round @click="delet">刪除</el-button>
            </template>
            </el-table-column>
        </el-table>
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
            dialogFormVisible:false,
            dialogFormNewVisible:false,
            tableData: [{
                    name: '王小虎',
                    tel: '上海',
                    password: '普陀区',
                    account: "0",
                }, {
                    name: '王小虎',
                    tel: '上海',
                    password: '普陀区',
                    account: "0",
                }, {
                    name: '王小虎',
                    tel: '上海',
                    password: '普陀区',
                    account: "0",
                }, {
                    name: '王小虎',
                    tel: '上海',
                    password: '普陀区',
                    account: "0",
            }],
            tableList:[
                {prop:"name",label:"姓名",width:''},
                {prop:"tel",label:"電話",width:''},
                {prop:"account",label:"賬號",width:''},
                {prop:"password",label:"密碼",width:''},
            ],
            ruleForm:{
                name:"",
                tel:"",
                account:"",
                pass:"",
                oldPass:"",
                newPass:"",
                confirm:""
            },
            rules:{
                name:[
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { pattern:/^[\u0391-\uFFE5A-Za-z]+$/ , message: '無效的姓名', trigger: 'blur' },
                ],
                tel:[
                    {required: true, message: '请输入電話', trigger: 'blur' },
                    { pattern:/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/ , message: '無效的電話', trigger: 'blur' },
                ],
                account:[
                    {required: true, message: '请输入賬號', trigger: 'blur' },
                ],
                password:[
                    {required: true, message: '请输入密碼', trigger: 'blur' },
                ]
            },
            currentPage: 1,
            pageSize:10,
            total:null
        }
    },
    mounted(){
        this.getNewPersonList()
    },
    methods:{
        // 獲取所有列表信息
        getNewPersonList(){
            console.log("獲取所有的列表信息")
        },
        // 點擊新建按鈕出現彈框
        add(){
            this.dialogFormNewVisible = true;
        },
        // 確認新建人員
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post("admin/addOneAdmin",{
                        realName: this.ruleForm.name,
                        phone: this.ruleForm.account,
                        phoneExt: this.ruleForm.tel,
                        password: this.ruleForm.password
                    }).then(res =>{
                        console.log(res)
                        if(res.code === 0){
                            this.$message({
                                message:"添加成功",
                                type:"success"
                            })
                            this.ruleForm.name = "";
                            this.ruleForm.account = "";
                            this.ruleForm.tel = "";
                            this.ruleForm.password = "";
                            this.dialogFormNewVisible = false
                        }
                    })
                } else {
                    this.$message.error("請確認所填寫的數據")
                    return false;
                }
            });
        },
        // 修改
        update(){
            this.dialogFormNewVisible  = true;
        },
        // 刪除
        delet(){
            this.$confirm('此操作將永久刪除該數據, 是否繼續?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '刪除成功!'
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消刪除'
                });          
            });
        },
        // 分頁
        handleCurrentChange(val){
            console.log("分頁")
        }
    }
}
</script>

<style>
    .el-table .cell{
        display: flex;
        justify-content: space-around;
    }
</style>
<style scoped>
    #update{
        color:#f99e1b;
        border-color:#f99e1b;
    }
    .el-button--primary{
       width:90%;
       background-color: #f99e1b;
       border-color:#f99e1b;
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


