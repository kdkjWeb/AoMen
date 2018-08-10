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
                prop="orderNumber"
                header-align = "center"
                label="訂單號">
                </el-table-column>
                <el-table-column
                prop="PurchaseUser"
                header-align = "center"
                label="購買用戶"
                :formatter="formatter">
                </el-table-column>
                <el-table-column
                prop="commodityName"
                header-align = "center"
                label="商品名稱">
                </el-table-column>
                <el-table-column
                prop="bussinessAcount"
                header-align = "center"
                label="商品賬號"
                :formatter="formatter">
                </el-table-column>
                <el-table-column
                prop="allMoney"
                header-align = "center"
                label="總金額">
                <template slot-scope="scope">
                    <p style="color:red">{{scope.row.allMoney}}</p>
                </template>
                </el-table-column>
                <el-table-column
                prop="PreferentialType"
                header-align = "center"
                label="優惠類型"
                :formatter="formatter">
                <template slot-scope="scope">
                    <p>無</p>
                    <p>積分減免</p>
                    <p>打折券</p>
                </template>
                </el-table-column>
                <el-table-column
                prop="DiscountedAmount"
                header-align = "center"
                label="打折金額">
                </el-table-column>
                <el-table-column
                prop="factPay"
                header-align = "center"
                label="實付款金額"
                :formatter="formatter">
                </el-table-column>
                <el-table-column
                prop="becomeTime"
                header-align = "center"
                label="成交時間"
                :formatter="formatter">
                </el-table-column>
                <el-table-column
                header-align = "center"
                prop="tag"
                label="訂單狀態"
                width="200"
                :filters="[{ text: '保護期', value: '保護期' }, { text: '退款中', value: '退款中' }, { text: '已退款', value: '已退款' },{ text: '已完結', value: '已完結' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"
                @filter-change="handleFilterChange">
                    <template slot-scope="scope">
                        <el-tag disable-transitions style="color:green">{{scope.row.tag}}</el-tag>
                        <!-- <el-tag disable-transitions>退款中</el-tag>
                        <el-tag disable-transitions style="color:red">已退款</el-tag>
                        <el-tag disable-transitions style="color:#f99e1b">已完結</el-tag> -->
                    </template>
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
    name:"userTrede",
    components:{
        searchBar,
    },
    data(){
        return{
            isShow:true,
            title:"用戶交易",
            placeholder:"訂單號/商品名/商家昵稱",
            currentPage: 1,
            pageSize:10,
            total:null,
            tableData: [{
                orderNumber:"8291",
                PurchaseUser:"黃大喵",
                commodityName:"美式咖啡",
                bussinessAcount:"2801",
                allMoney:"183",
                DiscountedAmount:"23",
                factPay:"160",
                becomeTime:"2018-08-10",
                tag:'保護期'
                },{
                    orderNumber:"8291",
                    PurchaseUser:"黃大喵",
                    commodityName:"美式咖啡",
                    bussinessAcount:"2801",
                    allMoney:"183",
                    DiscountedAmount:"23",
                    factPay:"160",
                    becomeTime:"2018-08-10",
                    tag:"退款中"
                },{
                    orderNumber:"8291",
                    PurchaseUser:"黃大喵",
                    commodityName:"美式咖啡",
                    bussinessAcount:"2801",
                    allMoney:"183",
                    DiscountedAmount:"23",
                    factPay:"160",
                    becomeTime:"2018-08-10",
                    tag:"已退款"
                },{
                orderNumber:"8291",
                PurchaseUser:"黃大喵",
                commodityName:"美式咖啡",
                bussinessAcount:"2801",
                allMoney:"183",
                DiscountedAmount:"23",
                factPay:"160",
                becomeTime:"2018-08-10",
                tag:"已完結"
            }],                 //用戶交易列表信息
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
        },
        handleCurrentChange(val){
            console.log("分頁")
        },
        // 表格篩選
        // handleFilterChange(filters){
        //     console.log(filters)
        // }
    }
}
</script>

<style>
.el-table .cell{
    display: flex;
    justify-content: space-around;
}
/* .el-checkbox__input{
    display: none
} */
/* .el-table-filter__bottom{
    display: none
} */
.el-tag{
    color:unset;
    border:none;
    background-color: unset
}
/* tbody .el-table_1_column_5{
    color: red;
} */
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

