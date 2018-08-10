<template>
    <div>
        <!-- 返回 -->
        <goBack :isShow="isShow" ></goBack>
        <!-- 返回 -->
        <!-- 內容 -->
        <div class="content">
            <!-- 用戶退款原因 -->
            <div class="cause">
                <h3>用戶退款原因</h3>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil eligendi dignissimos deleniti non, beatae hic a recusandae accusantium eaque quis at iusto. Ducimus non nihil expedita accusamus perferendis animi nam!
                </p>
                <div>
                    <img :src="img.src" alt="" v-for="(img,index) in imgs" :key="index">
                </div>
            </div>
            <!-- 用戶退款原因 -->
            <!-- 商家未處理、拒絕原因、同意 -->
            <div class="handle">
                <h3 v-show="isHandle">商家未处理</h3>
                <div v-show="isRefuse">
                    <h3>商家拒絕原因</h3>
                    <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae est, ut eligendi aut necessitatibus earum libero at quasi magni sequi eum deserunt doloremque minima iste eos praesentium, placeat soluta impedit!</p>
                </div>
                <h3 v-show="isAgreen">商家已同意退款</h3>
                <div class="btn">
                     <el-button @click="refuse">拒絕</el-button>
                     <el-button type="warning" @click="agreen">同意</el-button>
                </div>
            </div>
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
        <!-- 內容 -->
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
            dialogVisible:false,
            isShow:false,
            isRefuse:true,
            isHandle:false,
            isAgreen:false,
            imgs:[{
                src:"../../../static/header.jpg"
            },{
                src:"../../../static/header.jpg"
            }],
            form: {
                desc: ''
            }
        }
    },
    mounted(){
        this.getRefundByUser()
    },
    methods:{
        // 獲取用戶退款原因
        getRefundByUser(){
            console.log("獲取用戶退款原因")
        },
        // 商家拒絕
        refuse(){
            this.dialogVisible = true;
        },
        // 確定拒絕
        confirm(){
            if(this.form.desc == ""){
                this.$message.error("請填寫拒絕原因")
            }else{
                this.dialogVisible = false
            }
        },
        // 商家同意
        agreen(){
            console.log("同意");
            this.$confirm('是否同意此信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               this.$message({
                   message:"已同意",
                   type:"success"
               })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // handleClose(){
        //     this.dialogVisible = false
        // },
        
    }
}
</script>

<style>
.el-textarea__inner{
    height: 230px;
}
</style>

<style scoped>
.content{
    background-color: #fff;
    width:100%
}
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
.handle{
    width:98%;
    margin: auto;
    padding-top: 20px;
    box-sizing: border-box;
}
.handle h3{
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
</style>
