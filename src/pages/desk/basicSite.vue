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
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
                </el-tag>
                <el-button type="warning" @click="add"> <i class="el-icon-plus"></i> 新建</el-button>
            </div>
        </div>
        <!-- 內容 -->
        <!-- 彈出框 -->
        <el-dialog :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="類名：" label-width="60px">
                <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="圖標：" label-width="60px">
                    <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="warning" @click="dialogFormVisible = false">确 定</el-button>
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
            dialogVisible:false,
            dialogImageUrl:"",
            dialogFormVisible:false,
            title:"基本設置",
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: '',
            lists:[{
                h2:"服務類",
            },{
                h2:"實物類",
            }],
            form:{
                name:""
            }
        }
    },
    methods:{
        keep(){
            console.log("保存")
        },
         handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        add(){
            this.dialogFormVisible = true
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
}
</script>
<style>
    .el-dialog__footer{
        text-align: center
    }
    /* .el-upload--picture-card{
        width:80px !important;
        height: 80px;
    }
    .el-upload--picture-card i{
        margin-top: -40px !important;
    } */
</style>

<style scoped>
    .content{
        width:100%;
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
        margin-left: 40px;
    }
     .el-button{
        width:200px
    }
    
</style>
