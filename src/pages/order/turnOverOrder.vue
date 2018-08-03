<template>
    <div>
        <searchBar :title="title" :placeholder="placeholder" @search="search" @date="date" :isShow="isShow"></searchBar>
        <div class="table">
            <el-table
                :data="tableData"
                border
                height="600"
                style="width: 100%">
                <el-table-column
                header-align = "center"
                v-for="(item,index) in tableList"
                :key="index"
                :prop="item.prop"
                :label="item.label">
                </el-table-column>
            </el-table>
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
    </div>
</template>

<script>
import searchBar from "./../../components/searchBar.vue"

export default {
    name:"turnOverOrder",
    components:{
        searchBar,
    },
    data(){
        return{
            isShow:true,
            title:"已成交訂單",
            placeholder:"訂單號/商品名/商家昵稱",
            tableData: [{
                    orderNumber: '1234',
                    shopName: '星巴克',
                    commodityName: '美式咖啡',
                    commodityPrice: '12',
                    PurchaseUser: "黃大喵",
                    PurchaseNumber: "5",
                    PurchaseTime: "2018-07-26",
                    bussinessName: "星巴克",
                    orderState: "已完結",
                    allMoney: "60"
                }, {
                    orderNumber: '1234',
                    shopName: '星巴克',
                    commodityName: '美式咖啡',
                    commodityPrice: '12',
                    PurchaseUser: "黃大喵",
                    PurchaseNumber: "5",
                    PurchaseTime: "2018-07-26",
                    bussinessName: "星巴克",
                    orderState: "已完結",
                    allMoney: "60"
                }, {
                    orderNumber: '1234',
                    shopName: '星巴克',
                    commodityName: '美式咖啡',
                    commodityPrice: '12',
                    PurchaseUser: "黃大喵",
                    PurchaseNumber: "5",
                    PurchaseTime: "2018-07-26",
                    bussinessName: "星巴克",
                    orderState: "已完結",
                    allMoney: "60"
                }, {
                    orderNumber: '1234',
                    shopName: '星巴克',
                    commodityName: '美式咖啡',
                    commodityPrice: '12',
                    PurchaseUser: "黃大喵",
                    PurchaseNumber: "5",
                    PurchaseTime: "2018-07-26",
                    bussinessName: "星巴克",
                    orderState: "已完結",
                    allMoney: "60"
            }],
            tableList:[
                {prop:"orderNumber",label:"訂單號",width:''},
                {prop:"commodityName",label:"商品名稱",width:''},
                {prop:"commodityPrice",label:"商品單價",width:''},
                {prop:"PurchaseUser",label:"購買用戶",width:''},
                {prop:"PurchaseNumber",label:"購買數量",width:''},
                {prop:"allMoney",label:"總金額",width:''},
                {prop:"PurchaseTime",label:"購買時間",width:''},
                {prop:"bussinessName",label:"商家昵稱",width:''},
                {prop:"shopName",label:"店鋪昵稱",width:''},
                {prop:"orderState",label:"訂單狀態",width:''}
            ],
            currentPage: 1,
            pageSize:10,
            total:null
        }
    },
    methods:{
        date(val){
            console.log(val)
        },
        search(val){
            console.log(val)
        },
        handleCurrentChange(val){
            console.log("分頁")
        }
    }
}
</script>

<style>
.el-table .cell{
    display: flex;
    justify-content: space-around;
}
</style>
<style scoped>
    .block{
        width: 100%;
        height: 50px;
        background-color: #fff;
    }
    .el-pagination{
        float: right;
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

