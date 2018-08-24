<template>
    <div>
        <!-- 返回 -->
        <goBack></goBack>
        <!-- 返回 -->
        <div class="content">
            <!-- 用戶退款原因 -->
            <div class="cause">
                <h3>用戶退款原因</h3>
                <p>{{causeText}}</p>
                <!-- 退款憑證 -->
                <div>
                    <img :src="img.compress" alt="" v-for="(img,index) in imgs" :key="index" v-if="img.compress">
                </div>
                <!-- 退款憑證 -->
            </div>
            <!-- 用戶退款原因 -->
            <!-- 商家未處理、拒絕、同意 -->
            <div  class="Bhandle">
                <h3 style="color:#000;">商家意見</h3>
                <h3 v-if="shopStatus !== 1 && shopStatus !== -1">未处理</h3>
                <div v-if="shopStatus === -1" >
                    <h3 style="color:red">拒絕原因:</h3>
                    <p style="margin-left:30px">{{suggestion}}</p>
                </div>
                <h3 v-if="shopStatus === 1" style="color:green">已同意</h3>
            </div>
            <!-- 商家未處理、拒絕、同意 -->
            <!-- 管理員未處理、拒絕、同意 -->
            <div class="handle">
                <h3 style="color:#000" >管理员意见</h3>
                <h3 v-if="status == 0">未处理</h3>
                <div v-if="status == -1">
                    <h3 style="color:red">拒絕原因</h3>
                    <p>{{refuseText}}</p>
                </div>
                <h3 v-if="status == 1" style="color:green">已同意退款</h3>
                <div class="btn">
                     <el-button @click="refuse" v-show="isShow">拒絕</el-button>
                     <el-button type="warning" @click="agreen" v-show="isShow">同意</el-button>
                </div>
            </div>
            <!-- 管理員未處理、拒絕、同意 -->
            <!-- 填寫拒絕原因 -->
            <el-dialog :visible.sync="dialogVisible" width="600px">
                <el-form ref="form" :model="form" label-width="80px">
                    <h1>拒絕原因</h1>
                    <el-form-item>
                        <el-input type="textarea" v-model="form.desc" placeholder="請填寫拒絕原因" style="width:80%;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" id="confirm" @click="confirm">確定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!-- 填寫拒絕原因 -->
        </div>
    </div>
</template>

<script>
import goBack from "./../../components/goBack"
export default {
    name:"reBackOrderDetail",
    components:{
        goBack
    },
    data(){
        return{
            dialogVisible:false,    //彈框狀態
            isShow:true,            //按鈕在處理完後是否顯示
            imgs:[],
            form: {
                desc: ''
            },
            causeText:"",           //用戶退款理由
            refuseText:"",          //管理員拒絕理由
            status:"",              //管理員拒絕、同意的狀態
            suggestion:"",          //商家拒絕的理由
            shopStatus:""           //商家拒絕、同意的狀態
        }
    },
    mounted(){
        this.getRefundByUser(this.$route.query.id)
    },
    methods:{
        // 獲取用戶退款原因
        getRefundByUser(id){
            this.$get("refund/s_id/" + this.$route.query.id).then(res=>{
                if(res.code == 0){
                    this.imgs = [];
                    this.imgs = res.data.refundImgVos;          //用戶上傳退款憑證
                    this.causeText = res.data.comment;          //用戶退款理由
                    this.refuseText = res.data.reason;          //管理員拒絕理由
                    this.suggestion = res.data.shopReason;      //商家拒絕理由
                    this.id = res.data.id;                      //管理員同意、拒絕id                            
                    this.status = res.data.status;              //管理員意見狀態
                    this.shopStatus = res.data.shopStatus;      //商家意見狀態
                    if(this.status !=0){
                        this.isShow = false
                    }
                }else{
                    this.$message.error("沒有記錄！")
                }
            })
        },
        // 管理員拒絕
        refuse(){
            this.dialogVisible = true;
        },
        // 確定拒絕
        confirm(){
            if(this.form.desc == ""){
                this.$message.error("請填寫拒絕原因")
            }else{
                this.$post("refund/agreeOrRefuse",{
                    id: this.id,                //管理員拒絕的id
                    reason: this.form.desc,     //管理員拒絕理由
                    status: false               //管理員拒絕狀態
                }).then(res=>{
                    if(res.code == 0) {
                        this.$message({
                            message:"已拒絕",
                            type:"success"
                        });
                        this.dialogVisible = false;
                        this.getRefundByUser()
                    }else{
                        this.$message.error("無法拒絕此信息！")
                    }                  
                })
            }
        },
        // 管理員同意
        agreen(){
            this.$confirm('是否同意此信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$post("refund/agreeOrRefuse",{
                    id: this.id,
                    status: true    //管理員同意的狀態
                }).then(res=>{
                    if(res.code == 0){
                        this.$message({
                            message:"已同意",
                            type:"success"
                        });
                        this.getRefundByUser()
                    }else{
                        this.$message.error("無法同意該信息！")
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
    }
}
</script>

<style>
/* 拒絕 */
.el-textarea__inner{
    height: 230px;
}
</style>
<style scoped>
/* 主內容 */
.content{
    background-color: #fff;
    width:100%
}
/* 用戶退款原因 */
.cause{
    width:98%;
    margin: auto;
    padding-top: 40px;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
}
.cause h3,.handle h3{
    font-size:16px;
    font-weight:700;
}
.cause h3{
    border-left: 5px solid #eee;
    padding-left: 15px;
    margin-bottom: 30px;
}
.cause p,.handle p{
    font-size:14px;
    padding-left:20px;
    text-indent:28px;
    margin-bottom: 30px;
    box-sizing:border-box;
}
.cause img{
    width: 200px;
    height: 200px;
    margin: 0 0 40px 10px;
}
/* 用戶退款原因 */
/* 商家/管理員未處理、拒絕、同意 */
.handle,.Bhandle{
    width:98%;
    margin: auto;
    padding-top: 20px;
    box-sizing: border-box;
}
.handle h3, .Bhandle h3{
    font-size:16px;
    font-weight:700;
    color: #f99e1b;
    margin-bottom: 30px;
    padding-left:20px;
    box-sizing:border-box;
}
.btn{
    width: 650px;
    margin: auto;
    display: flex;
}
.handle .el-button{
    width:280px;
    height: 60px;
    margin-bottom: 30px;
    margin-right: 50px;
}
#confirm{
    width:80%;
}
h1{
    text-align:center;
    font-size:16px;
    font-weight: 700;
    margin-bottom: 20px;
}
/* 商家/管理員未處理、拒絕、同意 */
</style>
