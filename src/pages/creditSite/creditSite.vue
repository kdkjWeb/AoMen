<template>
    <div>
        <!-- start頂部標題新建按鈕 -->
        <newBuild @add="add" :isAdd="true" :title="title"></newBuild>
        <!-- end頂部標題新建按鈕 -->

       <!-- start积分兑换列表 -->
       <div class="integral">
           <div class="integral_list" v-for="(item,index) in integralList" :key="index">
               <dl>
                   <dt>
                       <img :src="item.imgSrc" alt="">
                   </dt>
                   <dd class="title">{{item.title}}</dd>
                   <dd>剩餘數量：<span>{{item.num}}</span></dd>
               </dl>
               <div class="btn">
                    <el-button type="primary" @click="examine(item)">查看</el-button>
                    <el-button type="danger" @click="deleted">刪除</el-button>
               </div>
           </div>
       </div>
       <!-- end积分兑换列表 -->


       <!-- start彈出框 -->
       <el-dialog title="新建積分兌換商品" :visible.sync="dialogFormVisible" width="35%">
        <div class="upload">
            <span>圖片：</span>
            <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

        </div>
        <el-form :model="form" label-position="right" label-width="120px" >
            <el-form-item label="商品名稱：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="領取上線：">
                <el-input placeholder="请输入内容" v-model="form.limit">
                    <template slot="append">人</template>
                </el-input>
            </el-form-item>
            <el-form-item label="需要積分：">
                <el-input v-model="form.integral"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="comfirm">确 定</el-button>
        </div>
        </el-dialog>
       <!-- end彈出框 -->
    </div>
</template>

<script>
import newBuild from "../../components/newBuild"
export default {
    name:"creditSite",
    components:{
        newBuild
    },
    data(){
        return{
            imageUrl: '',
            dialogFormVisible: false,
            form: {
                name: '',
                limit:'',
                integral: ''
                },
            title:"積分兌換設置",
            integralList: [
                {
                    imgSrc: '../../../static/header.jpg',
                    title: '僅需2萬積分兌換蘋果筆記本超級划算僅需2萬積分兌換蘋果筆記本超級划算',
                    num: '100'
                },{
                    imgSrc: '../../../static/header.jpg',
                    title: '僅需2萬積分兌換蘋果筆記本超級划算',
                    num: '50'
                }
            ]
        }
    },
    methods: {
        //新建
        add(){
            this.dialogFormVisible = true;
            console.log('新建')
        },
        //查看
        examine(val){
            console.log(val)
            this.$router.push({
                name: 'creditSiteDetails',
             
            })
        },
        //刪除
        deleted(val){
            console.log(val)
             this.$confirm('此操作將永久刪除該積分兌換活動, 是否繼續?', '提示', {
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
        //彈出框的取消按鈕
        cancel(){
            this.dialogFormVisible = false;
        },
        //彈出框的確認按鈕
        comfirm(){

        },




        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
}
</script>




<style>
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
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>

<style scoped>
.integral_list{
    width: 100%;
    height: 160px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 20px;
}
.integral_list dl{
    float: left;
    width: 400px;
}
.integral_list dl img{
    width: 120px;
    height: 120px;
    border-radius: 6px;
}
.integral_list dl dt{
    float: left;
    margin-right: 25px;
}
.integral_list dl dd.title{
    font-weight: bold;
    padding-bottom: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.integral_list div.btn{
    float: right;
    line-height: 120px;
}

.upload {
    margin-bottom: 20px;
}
.upload span{
    float: left;
    display: inline-block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    padding: 0 12px 0 0;
    text-align: right;
    box-sizing: border-box;
}
</style>
