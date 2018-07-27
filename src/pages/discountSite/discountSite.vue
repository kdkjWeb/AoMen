<template>
    <div>
        <newBuild @add="add" :isAdd="true" :title="title"></newBuild>
        <div class="list" v-for="(list,index) in lists" :key="index">
            <div class="left">
                <img :src="list.src" alt="">
                <ul>
                    <li class="money">
                        <h1>{{list.title}}</h1>
                        <span>{{list.state}}</span>
                    </li>
                    <li>{{list.active}}</li>
                    <li>剩餘數量：{{list.number}}</li>
                    <li>{{list.activeTime}}</li>
                </ul>
            </div>
            <el-button type="danger" @click="delet">刪除</el-button>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import newBuild from "../../components/newBuild"
export default {
    name:'discountSite',
    components:{
        newBuild
    },
    data(){
        return{
            dialogVisible:false,
            title:"打折券設置",
            lists:[{
                src:"../../../static/header.jpg",
                title:"代金券",
                state:"進行中",
                active:"滿50送5圓代金券",
                number:"77",
                activeTime:"2018-02-25至2018-03-25"
            },{
                src:"../../../static/header.jpg",
                title:"代金券",
                state:"進行中",
                active:"滿50送5圓代金券",
                number:"77",
                activeTime:"2018-02-25至2018-03-25"
            }]
        }
    },
    methods:{
        add(){
            this.dialogVisible = true
        },
        delet(){
            console.log("刪除")
        },
        handleClose(){
            this.dialogVisible = false
        }
    }
}
</script>


<style scoped>
    .list{
        width:100%;
        height: 160px;
        background-color: #fff;
        margin-bottom: 20px;
        padding:20px;
        box-sizing: border-box;
    }
    .list img{
        float: left;
        width: 120px;
        height: 120px;
        margin-right: 30px;
        border-radius: 6px;
    }
    .list .left{
        float: left;
        width:340px;
        height: 120px;
    }
    .list .money{
        display: flex;
        justify-content: space-between;
    }
    .list li:last-child{
        font-size: 14px;
        color: #333;
        margin-top: 30px;
    }
    .list li:first-child h1{
        font-size: 16px;
        color: #333;
        font-weight: 700;
    }
    .list li:first-child span{
        font-size: 12px;
        color: #f99e1b
    }
    .list li:nth-child(2),.list li:nth-child(3){
        font-size: 12px
    }
    .el-button--danger{
       float: right;
       margin-top: 40px ;
    }
</style>
