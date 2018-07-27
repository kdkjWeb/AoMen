<template>
    <div>
        <newBuild @newBulid="newBuild" :isAdd="true" :title="title"></newBuild>
        <div class="list">
            <div class="left">
                <img src="../../../static/header.jpg" alt="">
                <div >
                    <ul>
                        <li>
                            <p>代金券</p>
                            <span>進行中</span>
                        </li>
                        <li>滿50送5圓代金券</li>
                        <li>剩餘數量：77</li>
                        <li>2018-02-25--2018-03-25</li>
                    </ul>
                </div>
            </div>
            <el-button type="danger">危险按钮</el-button>
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
            title:"打折券設置"
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
        background-color: blue;
        margin: 20px;
    }
</style>
