<template>
    <div>
        <searchBar :title="title" :placeholder="placeholder" @search="search" @date="date" @orderStatus="orderStatus" :isShow="isShow" :isSearch="true" style="position:relative"></searchBar>
        <div class="table">
            <el-table
                :data="tableData"
                border
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
                label="訂單狀態"
                width="200"
                filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag disable-transitions style="color:green" v-if="scope.row.status == 1 || scope.row.status == 2 || scope.row.status == 3">保護期</el-tag>
                        <el-tag disable-transitions style="color:#3f51b5" v-if="scope.row.status == 4">申請退款中</el-tag>
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
            dateTime:[],
            state:''
        }
    },
    mounted(){
        this.getTradeList(this.currentPage)
    },
    methods:{
        // 獲取所有用戶交易列表
        getTradeList(currentPage , val , date = [] , status){
            this.$get("orderForm/queryUserTransaction",{
                val: val,
                status: status,
                startTime: date.length > 0 ? this.$getTimes(date[0]) : null,
                endTime:  date.length > 0 ? this.$getTimes(date[1]) : null,
                pageNum: currentPage ? currentPage : 1,
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
            this.dateTime = val;
            this.currentPage = 1;
            this.getTradeList("","",val,"")
        },
        // 查詢
        search(val){
            this.dateTime = []
            this.state = []
            this.currentPage = 1;
            this.getTradeList(this.currentPage,val)
        },
        // 訂單狀態查詢
        orderStatus(val){
            this.state = val
            this.currentPage = 1;
            this.getTradeList(this.currentPage,"",this.dateTime,val)
        },
        // 分頁
        handleCurrentChange(val){
            this.currentPage = val;
            this.getTradeList(this.currentPage,"",this.dateTime,this.state);
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

