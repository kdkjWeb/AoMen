<template>
    <div>
        <newBuild @newBulid="newBuild" :isAdd="true" :title="title"></newBuild>
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
        newBuild(){
            console.log("新建")
        },
        delet(){
            console.log("刪除")
        }
    }
}
</script>


<style scoped>
    .list{
        display: flex;
        justify-content: space-between;
        width:100%;
        height: 160px;
        background-color: #fff;
        margin-bottom: 20px;
    }
    .list img{
        width: 120px;
        height: 120px;
    }
    .list .left{
        display: flex;
        justify-content: space-around;
        width:340px;
        height: 120px;
        margin: 20px 0;
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
        width:140px;
        height: 70px;
        margin: 45px 20px 0 0;
    }
</style>
