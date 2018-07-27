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
                integral: '20000'
            }
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
</style>
