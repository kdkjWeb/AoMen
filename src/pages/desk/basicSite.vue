<template>
    <div>
        <!-- start頂部標題新建按鈕 -->
        <newBuild @keep="keep"  :title="title"></newBuild>
        <!-- end頂部標題新建按鈕 -->
        <!-- 內容 -->
        <div class="content">
            <h1>APP分類設置</h1>
            <div class="type" v-for="(list,index) in lists" :key="index">
                <h2>{{list.h2}}</h2>
                <el-tag
                :key="tag.id"
                v-for="(tag,index1) in list.dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag,index,index1)"
                :type="tag.status === 0 ? 'primary':'info'">
                    {{tag.typeName}}
                </el-tag>
                <el-button type="warning" @click="add(list)"> <i class="el-icon-plus"></i> 新建</el-button>
            </div>
        </div>
        <!-- 內容 -->
        <!-- 彈出框 -->
        <el-dialog :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="類名：" label-width="100px" prop="typeName">
                    <el-input v-model="form.typeName" auto-complete="off"></el-input>
                </el-form-item>
                <div class="upload">
                    <el-button style="margin-bottom:50px" @click="upLoad" type="primary" size="mini" :data="data">上傳圖標</el-button>
                    <img :src="form.img" alt="">
                    <input type="file" :model="imgFile" ref="imgFileInput" v-show="false" @change="showImage">
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="warning" @click="submitForm('form')">确 認</el-button>
            </div>
        </el-dialog>
        <!-- 彈出框 -->
    </div>
</template>

<script>
import newBuild from "../../components/newBuild"

export default {
    name:"basicSite",
    components:{
        newBuild,
    },
    data(){
        return{
            dialogVisible:false,
            dialogFormVisible:false,
            title:"基本設置",
            inputVisible: false,
            inputValue: '',
            lists:[{
                h2:"服務類",
                dynamicTags: []
            },{
                h2:"實物類",
                dynamicTags: []
            }],
            form:{
                typeName:"",
                file:"",
                img:"",
                kind:""
            },
            rules:{
                typeName:[
                    {required: true, message: '请输入類名', trigger: 'blur'}
                ]
            },
            imgFile:"",
            data: {
                kind: ''
            },
        }
    },
    mounted(){
        this.getTypes()
    },
    methods:{
        // 獲取所有類名
        getTypes(index){
            this.$get("goodsType/s_all",{
                pageSize:0,
                status:2
            }).then(res =>{
                if(res.code == 0){
                    this.lists[1].dynamicTags = []
                    this.lists[0].dynamicTags = []
                    for(let i = 0;i < res.data.list.length; i++){
                        if(res.data.list[i].kind == "0"){
                            this.lists[1].dynamicTags.push(res.data.list[i])
                        }else{
                            this.lists[0].dynamicTags.push(res.data.list[i])
                        }
                    }
                }else{
                    this.$message.error("沒有記錄")
                }
            })
        },
        // 保存修改內容
        keep(){
            this.isloading = true
            this.$get("goodsType/save").then(res=>{
                if(res.code === 0){
                    setTimeout(()=>{
                        this.$message({
                            message:"保存成功",
                            type:"success"
                        })
                        // this.$refs.upload.clearFiles();
                        this.getTypes();
                        this.isloading = false
                    },2000)
                }else{
                    this.$message.error("保存失败！")
                }
            })
        },
        // 刪除標籤
        handleClose(tag,index,index1) {
            this.$confirm('此操作將永久刪除該類別，是否繼續?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$post("goodsType/del",{
                    id: tag.id,
                    status: -1
                }).then(res=>{
                    if(res.code == 0){
                        this.lists[index].dynamicTags.splice(index1,1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getTypes()
                    }else{
                        this.$message.error("该数据已有用户在使用，不支持删除!")
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '删除已取消'
                });          
            });
        },
        // 新建標籤
        add(val){
            this.dialogFormVisible = true;
            if(val.h2 == '服務類'){
                this.data.kind = 1;
            }else{
                this.data.kind = 0;
            }
        },
        //上傳
        upLoad(){
            var fileInput = this.$refs.imgFileInput;
            fileInput.click()
        },
        // 顯示圖片
        showImage(){
            var fileInput = this.$refs.imgFileInput;
            var fileReader = new FileReader();
            var imgData = fileReader.readAsDataURL(fileInput.files[0]);
            this.form.file = fileInput.files[0];
            var that = this;
            fileReader.onload = function(){
                that.form.img = this.result
            }
        },
        // 確定新建
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.form.img == ""){
                        this.$message.error("請上傳圖標")
                    }else{
                        var formData = new FormData;
                        if(this.data.kind == 1){
                            formData.append("kind",this.data.kind)
                        }else{
                            formData.append("kind",this.data.kind)
                        }
                        formData.append("typeName",this.form.typeName);
                        formData.append("file",this.form.file)
                        this.$post("goodsType/add",formData).then(res =>{
                            if(res.code == 0){
                                if(this.data.kind == 1){
                                    this.lists[0].dynamicTags.push(res.data);
                                    this.dialogFormVisible = false;
                                    this.form.typeName = "";
                                    this.form.img = ""
                                }else{
                                    this.lists[1].dynamicTags.push(res.data);
                                    this.dialogFormVisible = false;
                                    this.form.typeName = "";
                                    this.form.img = "";
                                }
                            }else{
                                this.$message.error("新增失敗，同一類別不能重複新增")
                                setTimeout(()=>{
                                    this.isloading = false;
                                },3000)
                            }
                        })
                    }
                } else {
                    this.$message.error("请检查所填数据！")
                    return false;
                }
            });
          
        },
        // 取消新增圖標
        cancle(){
            this.dialogFormVisible = false;
            this.form.typeName = "";
            this.form.img = ""
        }
    }
}
</script>

<style>
    .el-dialog__footer{
        text-align: center
    }
</style>


<style scoped>
    .content{
        width:100%;
        height: 700px;
        background-color: #fff;
    }
    .content h1{
        width: 100%;
        height: 80px;
        line-height: 80px;
        padding-left: 20px;
        font-size: 16px;
        font-weight: 700;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
    }
    .el-tag {
        margin: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .type{
        padding: 20px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
    }
    .type h2{
        margin-bottom: 20px
    }
    .type .el-button--warning{
        width:unset;
        margin-left: 10px;
    }
     .upload img{
        width:200px;
        margin:0 20px 20px 20px;
        vertical-align:middle;
    }
    em{
        position: absolute;
        top:0;
        left:4px;
        z-index: 100;
    }
</style>
