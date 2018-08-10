<template>
    <div>
        <goBack></goBack>

        <div class="integral_list">
            <dl>
                <dt>
                    <img :src="this.$route.query.img" alt="">
                </dt>
                <dd class="title">{{item.goodsName}}</dd>
                <dd>剩餘數量：<span>{{item.storeCount}}</span></dd>
                <dd><span>{{item.needIntegral}}</span></dd>
            </dl>
        </div>
        <div class="userList" v-for="(user,index) in users" :key="index">
            <ul >
                <li>用戶賬號：<span>{{user.userId?user.userId:"暫無數據"}}</span></li>
                <li>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;稱：<span>{{user.nickname?user.nickname:"暫無數據"}}</span></li>
                <li>聯繫人：<span>{{user.receiveName?user.receiveName:"暫無數據"}}</span></li>
                <li>聯繫方式：<span>{{user.receivePhone?user.receivePhone:"暫無數據"}}</span></li>
                <li>聯繫地址：<span>{{user.receiveAddress?user.receiveAddress:"暫無數據"}}</span></li>
            </ul>
        </div>
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
            currentPage: 1,
            pageSize:10,
            total:null,
            item:{}, 
            users:[]
        }
    },
    mounted(){
      this.getIntegralMsg(this.$route.query.id)
    },
    methods:{
       getIntegralMsg(id){
           this.$get("IntegralGoodsController/selectPaymentDetails",{
                integralGoodsId: id,
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }).then(res=>{
               if(res.code == 0){
                   this.users = [];
                   this.total = res.data.paymentsList.total;
                   this.item = res.data;
                   this.users = res.data.paymentsList.list
               }
           })
       },
        // 分頁
        handleCurrentChange(){}
    },
   
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
    width:300px;
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
    background-color: #fff;
}
.userList ul{
    width:97%;
    margin:auto;
    display: flex;
    flex-wrap: wrap;
    padding: 30px;
    box-sizing:border-box;
    border-bottom:1px solid #ccc;
}
.userList li{
    width:33.3%;
    line-height: 40px;
    font-size: 14px;
    color: #333;
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
