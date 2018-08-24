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
                   <dd class="title">
                        <el-tooltip class="item" effect="dark" :content=item.goodsName placement="top-start" style="margin-right:30px">
                            <h1>{{item.goodsName}}</h1>
                        </el-tooltip>
                    </dd>
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
       <el-dialog title="新建積分兌換商品" :visible.sync="dialogFormVisible" width="35%" center>
        <el-form :model="form" label-position="right" label-width="120px" :rules="rules" ref="form">
            
            <el-form-item label="商品名稱：" prop="goodsName">
                <el-input v-model="form.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="領取上線：" prop="storeCount">
                <el-input placeholder="请输入内容" v-model="form.storeCount">
                    <template slot="append">人</template>
                </el-input>
            </el-form-item>
            <el-form-item label="需要積分：" prop="needIntegral">
                <el-input v-model="form.needIntegral"></el-input>
            </el-form-item>
            <div class="upload">
                <el-button style="margin-left:20px;margin-bottom:50px" @click="upLoad" type="primary" size="mini">上傳圖片</el-button>
                <img :src="form.img" alt="">
                <input type="file" :model="imgFile" ref="imgFileInput" v-show="false" @change="showImage">
            </div>
            <el-form-item style="margin-left:20%">
                <el-button @click="cancle">取 消</el-button>
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
                goodsName: '',
                storeCount:'',
                needIntegral: '',
                img:"",
                file:""
            },
            imgFile:"",
            title:"積分兌換設置",
            integralList: [],
            rules:{
                goodsName:[
                    { required: true, message: '请输入商品名稱', trigger: 'blur' },
                ],
                storeCount:[
                    { required: true, message: '请输入最多领取人数', trigger: 'blur' },
                ],
                needIntegral:[
                    { required: true, message: '请输入领取所需分数', trigger: 'blur' },
                ]
            },
            currentPage: 1,
            pageSize:10,
            total:null
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
                }else{
                    this.$message.error("沒有記錄")
                }
            })
        },
        //新建
        add(){
            this.dialogFormVisible = true;
        },
        // 上傳圖片
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
                that.form.img = this.result;
            }
        },
        // 確認新建
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.form.img == ""){
                    this.$message.error("請上傳圖片")
                }else{
                    var formData = new FormData;
                    formData.append("goodsName",this.form.goodsName);
                    formData.append("needIntegral",this.form.needIntegral)
                    formData.append("storeCount",this.form.storeCount);
                    formData.append("file",this.form.file);
                    this.$post("IntegralGoodsController/addIntegralGoods",formData).then(res=>{
                        if(res.code ==0){
                            this.$message({
                                message:"新增成功",
                                type:"success"
                            });
                            this.getIntegral();
                            this.dialogFormVisible = false;
                            this.form.goodsName = "";
                            this.form.needIntegral = "";
                            this.form.storeCount = "";
                            this.form.img = ""
                        }else{
                            this.$message.error("新增失敗")
                        }
                    })
                }
            } else {
                this.$message.error("請檢查所填數據")
                return false;
            }
            });
        },
        // 取消新建
        cancle(){
            this.dialogFormVisible = false;
            this.form.goodsName = "";
            this.form.needIntegral = "";
            this.form.storeCount = "";
            this.form.img = "";
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
                    this.$get("IntegralGoodsController/deleteOne",{
                        goodsId:val.id
                    }).then(res=>{
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
        //分頁
        handleCurrentChange(val){
            this.currentPage = val;
            this.getIntegral(this.currentPage)
        },
       
    }
}
</script>


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
.integral_list dl h1{
    width:80px;
    font-size: 18px;
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
.upload img{
    width:200px;
    margin:0 20px 20px 20px;
    vertical-align:middle;
}
</style>
