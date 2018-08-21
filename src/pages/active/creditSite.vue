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
                       <img :src="item.origin" alt="">
                   </dt>
                   <dd class="title">{{item.goodsName}}</dd>
                   <dd>剩餘數量：<span>{{item.storeCount}}</span></dd>
               </dl>
               <div class="btn">
                    <el-button type="primary" @click="examine(item)">查看</el-button>
                    <el-button type="danger" @click="deleted(item)">刪除</el-button>
               </div>
           </div>
       </div>
       <!-- end积分兑换列表 -->
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
        <!-- 分頁 -->
       <!-- start彈出框 -->
       <el-dialog title="新建積分兌換商品" :visible.sync="dialogFormVisible" width="35%">
        <div class="upload">
            <span> <em style="color:red;margin-right:10px">*</em>圖片：</span>
            <el-upload
                ref="upLoad"
                class="avatar-uploader"
                action="http://101.207.139.80:8081/IntegralGoodsController/addIntegralGoods"
                :show-file-list="false"
                accept="image/jpeg,image/png,image/jpg"
                name="file"
                :data="data"
                :auto-upload="false"
                :with-credentials="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div v-show="isComfirm"><p style="color:red">點擊確認按鈕后方可顯示</p></div>
            </el-upload>
        </div>
        <el-form :model="form" label-position="right" label-width="120px" :rules="rules" ref="form">
            <el-form-item label="商品名稱：" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="領取上線：" prop="limit">
                <el-input placeholder="请输入内容" v-model="form.limit">
                    <template slot="append">人</template>
                </el-input>
            </el-form-item>
            <el-form-item label="需要積分：" prop="integral">
                <el-input v-model="form.integral"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="submitForm('form')">確 認</el-button>
            </el-form-item>
        </el-form>
       
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
            isComfirm:true,
            imageUrl: '',
            dialogFormVisible: false,
            form: {
                name: '',
                limit:'',
                integral: ''
                },
            title:"積分兌換設置",
            integralList: [],
            rules:{
                name:[
                    { required: true, message: '请输入商品名稱', trigger: 'blur' },
                ],
                limit:[
                    { required: true, message: '请输入最多领取人数', trigger: 'blur' },
                ],
                integral:[
                    { required: true, message: '请输入领取所需分数', trigger: 'blur' },
                ]
            },
            currentPage: 1,
            pageSize:10,
            total:null,
            data:{
                goodsName: "",
                needIntegral: "",
                storeCount: ""
            }
        }
    },
    mounted(){
        this.getIntegral(this.currentPage)
    },
    methods: {
        // 獲取所有積分兌換列表
        getIntegral(currentPage){
            this.$get("IntegralGoodsController/getIntegralGoodsList",{
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }).then(res=>{
                if(res.code == 0){
                    this.integralList = [];
                    this.total = res.data.total;
                    this.integralList = res.data.list;
                }
            })
        },
        //新建
        add(){
            this.dialogFormVisible = true;
        },
        // 確認新建
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$refs.upLoad.submit();
                setTimeout(()=>{
                    this.dialogFormVisible = false;
                    this.getIntegral()
                },3000);
                this.isComfirm = false;
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        //查看
        examine(val){
            this.$router.push({
                name: 'creditSiteDetails',
                query:{
                    id: val.id,
                    img: val.origin
                }
            })
        },
        //刪除
        deleted(val,index){
             this.$confirm('此操作將永久刪除該積分兌換活動, 是否繼續?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    console.log(val.id)
                    this.$get("IntegralGoodsController/deleteOne",{
                        goodsId:val.id
                    }).then(res=>{
                        console.log(res);
                        if(res.code == 0){
                            this.$message({
                                type: 'success',
                                message: '刪除成功!'
                            })
                            this.integralList.splice(index,1);
                            this.getIntegral()
                        }else{
                            this.$message.error("刪除失敗")
                        }
                       
                    })
                   
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
        handleCurrentChange(val){
            this.currentPage = val;
            this.getIntegral(this.currentPage)
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            this.data.goodsName  = this.form.name;
            this.data.needIntegral   = this.form.integral;
            this.data.storeCount   = this.form.limit;
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
    line-height: 178px !important;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style scoped>
.integral{
    width:100%;
    background-color: #fff;
}
.integral_list{
    width: 97%;
    margin:auto;
    height: 160px;
    padding: 20px 0;
    border-bottom:1px solid #ccc;
    box-sizing: border-box;
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
    position: relative;
}
em{
    position: absolute;
    top:0;
    left:55px;
    z-index: 100;
}
.block{
    width: 100%;
    height: 50px;
    background-color: #fff;
}
.el-pagination{
    float: right;
    margin-right: 20px;
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
