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
                prop="orderNum"
                header-align = "center"
                label="訂單號">
                </el-table-column>
                <el-table-column
                prop="buyer"
                header-align = "center"
                label="購買用戶">
                </el-table-column>
                <el-table-column
                prop="goodsName"
                header-align = "center"
                label="商品名稱">
                </el-table-column>
                <el-table-column
                prop="shopName"
                header-align = "center"
                label="商家賬號">
                </el-table-column>
                <el-table-column
                header-align = "center"
                label="總金額">
                <template slot-scope="scope">
                    <p style="color:red">{{scope.row.totalPrice}}</p>
                </template>
                </el-table-column>
                <el-table-column
                header-align = "center"
                label="優惠類型">
                <template slot-scope="scope">
                    <p>{{scope.row.coupons}}</p>
                    <!-- <p>積分減免</p>
                    <p>打折券</p> -->
                </template>
                </el-table-column>
                <el-table-column
                prop="discountPrice"
                header-align = "center"
                label="打折金額">
                </el-table-column>
                <el-table-column
                prop="realPrice"
                header-align = "center"
                label="實付款金額">
                </el-table-column>
                <el-table-column
                prop="paidTime"
                header-align = "center"
                label="成交時間">
                </el-table-column>
                <el-table-column
                header-align = "center"
                prop="status"
                column-key="status"
                label="訂單狀態"
                width="200"
                :filters="[{ text: '保護期', value: '1' }, { text: '退款中', value: '4' }, { text: '已退款', value: '5' },{ text: '已完結', value: '6' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"
                @filter-change="handleFilterChange">
                    <template slot-scope="scope">
                        <el-tag disable-transitions style="color:green" v-if="scope.row.status == 1 || scope.row.status == 2 || scope.row.status == 3">保護期</el-tag>
                        <el-tag disable-transitions style="color:#3f51b5" v-if="scope.row.status == 4">退款中</el-tag>
                        <el-tag disable-transitions style="color:red" v-if="scope.row.status == 5">已退款</el-tag>
                        <el-tag disable-transitions style="color:#f99e1b" v-if="scope.row.status == 6">已完結</el-tag>
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
        searchBar
    },
    data(){
        return{
            isShow:true,
            title:"用戶交易",
            placeholder:"訂單號/商品名",
            currentPage: 1,
            pageSize:10,
            total:null,
            tableData: [],                 //用戶交易列表信息
        }
    },
    mounted(){
        this.getTradeList(this.currentPage)
    },
    methods:{
        // 獲取所有用戶交易列表
        getTradeList(currentPage){
            this.$get("orderForm/queryUserTransaction",{
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }).then(res=>{
                if(res.code == 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                }
            })
        },
        // 按時間查詢
        date(val){
            this.$get("orderForm/queryUserTransaction",{
                startTime: this.$getTimes(val[0]),
                endTime: this.$getTimes(val[1]),
            }).then(res=>{
                if(res.code == 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                }
            })
        },
        // 查詢
        search(val){
            console.log(val);
            this.$get("orderForm/queryUserTransaction",{
               val: val
            }).then(res=>{
                if(res.code == 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                }
            })
        },
        // 訂單狀態查詢
        filterTag(value, row) {
            console.log(value)
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        handleFilterChange(filters,value){
            console.log(value);
            this.$get("orderForm/queryUserTransaction",{
               status: value
            }).then(res=>{
                if(res.code == 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                }
            })
        },
        // 分頁
        handleCurrentChange(val){
            this.currentPage = val;
            this.getTradeList(this.currentPage)
        },
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

