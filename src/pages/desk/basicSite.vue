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
                @close="handleClose(tag,index,index1)">
                {{tag.typeName}}
                </el-tag>
                <el-button type="warning" @click="add(list)"> <i class="el-icon-plus"></i> 新建</el-button>
            </div>
        </div>
        <!-- 內容 -->
        <!-- 彈出框 -->
        <el-dialog :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="類名：" label-width="70px" prop="typeName">
                    <el-input v-model="form.typeName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div class="upload">
                <span><em style="color:red;margin-right:10px">*</em>圖片：</span>
                <el-upload
                    ref="upLoad"
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="true"
                    accept="image/jpeg,image/png,image/jpg"
                    name="file"
                    :data="data"
                    :auto-upload="false"
                    :with-credentials="true"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="warning" @click="submitForm('form')">确 定</el-button>
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
        newBuild
    },
    data(){
        return{
            imageUrl:"",
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
                typeName:""
            },
            rules:{
                typeName:[
                    {required: true, message: '请输入類名', trigger: 'blur'}
                ]
            },
            data: {
                typeName: '',
                kind: ''
            },
            bool:true,
            uploadUrl:"http://192.168.20.50:8081/goodsType/add"
        }
    },
    mounted(){
        this.getTypes()
    },
    methods:{
        // 獲取所有類名
        getTypes(index){
            this.$get("goodsType/s_all",{
                pageSize:0
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
                }
            })
        },
        // 保存修改內容
        keep(){
            this.$get("goodsType/save",{}).then(res=>{
                console.log(res);
                if(res.code === 0){
                    this.$message({
                        message:"保存成功",
                        type:"success"
                    })
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
                    status: 1
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
        // 確定新建
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$refs.upLoad.submit();
                    setTimeout(()=>{
                        // this.$message({
                        //     message:"新建成功",
                        //     type:"success"
                        // })
                         this.dialogFormVisible = false;
                         this.getTypes()
                    },3000)
                   
                } else {
                    this.$message.error("请检查所填数据！")
                    return false;
                }
            });
          
        },
        
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            this.data.typeName = this.form.typeName;
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        
    }
}
</script>

<style>
    .el-dialog__footer{
        text-align: center
    }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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
     .el-button{
        width:200px
    }
    .upload span{
        float: left;
        display: inline-block;
        width: 70px;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        box-sizing: border-box;
        position: relative;
    }
    em{
        position: absolute;
        top:0;
        left:4px;
        z-index: 100;
    }
</style>
