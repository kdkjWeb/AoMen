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
            <!-- 商家未處理、拒絕原因、同意-->
            <div class="handle">
                <h3>商家拒絕原因</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae est, ut eligendi aut necessitatibus earum libero at quasi magni sequi eum deserunt doloremque minima iste eos praesentium, placeat soluta impedit!</p>
                <div class="btn">
                     <el-button @click="refuse">拒絕</el-button>
                     <el-button type="warning" @click="agreen">同意</el-button>
                </div>
            </div>
            <!-- 填寫拒絕原因 -->
            <el-dialog
            :visible.sync="dialogVisible"
            width="600px"
            :before-close="handleClose">
            <div>
                
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item>
                    <el-input type="textarea" v-model="form.desc" placeholder="請填寫拒絕原因"></el-input>
                </el-form-item>
                 <el-form-item>
                    <el-button type="warning" id="confirm">確定</el-button>
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
    methods:{
        refuse(){
            console.log("拒絕")
            this.dialogVisible = true
        },
        agreen(){
            console.log("同意")
        },
        handleClose(){
            console.log("關閉")
        }
    }
}
</script>

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
.cause h3{
    border-left: 5px solid #eee;
    padding-left: 15px;
    margin-bottom: 30px;
}
.cause p,.handle p{
    margin-bottom: 50px;
}
.cause img{
    width: 200px;
    height: 200px;
    margin: 0 0 40px 10px;
}
.handle{
    width:98%;
    margin: auto;
    padding-top: 30px;
    box-sizing: border-box;
}
.handle h3{
    color: #f99e1b;
    margin-bottom: 30px;
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
    /* #confirm{
        width:550px
    } */
</style>
