<template>
    <div>
        <goBack></goBack>

        <div class="integral_list">
            <dl>
                <dt>
                    <img :src="item.imgSrc" alt="">
                </dt>
                <dd class="title">{{item.title}}</dd>
                <dd>剩餘數量：<span>{{item.num}}</span></dd>
                <dd><span>{{item.integral}}</span></dd>
            </dl>
        </div>
        <div class="userList" v-for="(user,index) in users" :key="index">
            <ul>
                <li>用戶賬號：<span>{{user.account}}</span></li>
                <li>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;稱：<span>{{user.name}}</span></li>
                <li>聯繫人：<span>{{user.contactUser}}</span></li>
                <li>聯繫方式：<span>{{user.contactWay}}</span></li>
                <li>聯繫地址：<span>{{user.contactAds}}</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
import goBack from './../../components/goBack.vue';
export default {
    components:{
        goBack
    },
    data(){
        return{
            item:{
                imgSrc: '../../../static/header.jpg',
                title: '僅需2萬積分兌換蘋果筆記本超級划算僅需2萬積分兌換蘋果筆記本超級划算',
                num: '50',
                integral: '20000',
            }, 
            users:[{
                account:"123465",
                name:"付款熱",
                contactUser:"黃大喵",
                contactWay:"123456789",
                contactAds:"電飯煲的忽然感覺如果福誒"
            },{
                account:"123465",
                name:"付款熱",
                contactUser:"黃大喵",
                contactWay:"123456789",
                contactAds:"電飯煲的忽然感覺如果福誒"
            }]
        }
    },
    methods:{

    },
    mounted(){

    }
}
</script>

<style scoped>
.integral_list{
    width: 100%;
    height: 160px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 20px;
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
.integral_list dl dd:last-child{
    padding-top: 35px;
    font-size: 24px;
    color: #f99e1b;
}
.userList{
    width:100%;
    height: 160px;
    background-color: #fff;
    margin-bottom: 20px;
}
.userList ul{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    padding: 40px;
}
.userList li{
    width:33%;
    line-height: 40px;
    font-size: 14px;
    color: #333;
}
</style>
