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
                <el-table-column
                header-align = "center"
                prop="tag"
                label="訂單狀態"
                width="200"
                :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.tag === '家' ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.tag}}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import searchBar from "./../../components/searchBar.vue"

export default {
    name:"turnOverOrder",
    components:{
        searchBar
    },
    data(){
        return{
            isShow:true,
            title:"用戶交易",
            placeholder:"訂單號/商品名/商家昵稱",
            tableData: [{
                   orderNumber: '1234',
                    bussinessAcount: '789',
                    commodityName: '美式咖啡',
                    commodityPrice: '12',
                    PurchaseUser: "黃大喵",
                    PreferentialType: "滿減",
                    PurchaseTime: "2018-07-26",
                    DiscountedAmount: "2",
                    factPay: "10",
                    becomeTime: "2018-07-26",
                    allMoney: "60",
                     tag: '家'
                }, {
                   orderNumber: '1234',
                    bussinessAcount: '789',
                    commodityName: '美式咖啡',
                    commodityPrice: '12',
                    PurchaseUser: "黃大喵",
                    PreferentialType: "滿減",
                    PurchaseTime: "2018-07-26",
                    DiscountedAmount: "2",
                    factPay: "10",
                    becomeTime: "2018-07-26",
                    allMoney: "60",
                     tag: '家'
                }, {
                    orderNumber: '1234',
                    bussinessAcount: '789',
                    commodityName: '美式咖啡',
                    commodityPrice: '12',
                    PurchaseUser: "黃大喵",
                    PreferentialType: "滿減",
                    PurchaseTime: "2018-07-26",
                    DiscountedAmount: "2",
                    factPay: "10",
                    becomeTime: "2018-07-26",
                    allMoney: "60",
                     tag: '家'
                }, {
                    orderNumber: '1234',
                    bussinessAcount: '789',
                    commodityName: '美式咖啡',
                    commodityPrice: '12',
                    PurchaseUser: "黃大喵",
                    PreferentialType: "滿減",
                    PurchaseTime: "2018-07-26",
                    DiscountedAmount: "2",
                    factPay: "10",
                    becomeTime: "2018-07-26",
                    allMoney: "60",
                     tag: '家'
            }],
            tableList:[
                {prop:"orderNumber",label:"訂單號",width:''},
                {prop:"PurchaseUser",label:"購買用戶",width:''},
                {prop:"commodityName",label:"商品名稱",width:''},
                {prop:"bussinessAcount",label:"商家帳號",width:''},
                {prop:"allMoney",label:"總金額",width:''},
                {prop:"PreferentialType",label:"優惠類型",width:''},
                {prop:"DiscountedAmount",label:"打折金額",width:''},
                {prop:"factPay",label:"實付款金額",width:''},
                {prop:"becomeTime",label:"成交時間",width:''},
            ]
        }
    },
    methods:{
        date(val){
            console.log(val)
        },
        search(val){
            console.log(val)
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        }
    }
}
</script>

<style>
.el-table .cell{
    display: flex;
    justify-content: space-around;
}
.el-checkbox__input{
    display: none
}
/* .el-table-filter__bottom{
    display: none
} */
.el-tag{
    color:unset;
    border:none;
    background-color: unset
}
</style>
