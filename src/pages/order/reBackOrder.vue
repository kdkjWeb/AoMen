<template>
    <div>
        <!-- start 頂部搜索 -->
        <searchBar :title="title" :placeholder="placeholder" :isShow="isShow" @date="date" @search="search"></searchBar>
        <!-- end 頂部搜索 -->

        <!-- start 表格 -->
        <div class="table">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                header-align = "center"
                v-for="(item,index) in tableList"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width">
                </el-table-column>
                 <el-table-column
                prop="status"
                header-align = "center"
                label="訂單狀態">
                <template slot-scope="scope">
                    <p style="color:red;text-decoration:underline;" v-if="scope.row.status == 4">未處理</p>
                    <p v-else style="color:green">已處理</p>
                </template>
                </el-table-column>
                <el-table-column
                header-align = "center"
                label="退款詳情">
                <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
        <!-- end 表格 -->
    </div>
</template>

<script>
import searchBar from './../../components/searchBar'

export default {
    name:"reBackOrder",
    components:{
        searchBar,
    },
    data(){
        return{
            placeholder: '訂單號/商品名/商家暱稱',
            title: '退款訂單',
            isShow: true,
            currentPage:1,
            pageSize:10,
            total:null,
            tableList:[
                {prop:'orderNum', label: '訂單號', width: ''},
                {prop:'goodsName', label: '商品名稱', width: ''},
                {prop:'unitPrice', label: '商品單價', width: ''},
                {prop: 'buyer', label: '購買用戶', width: ''},
                {prop: 'amount', label: '購買數量', width: ''},
                {prop: 'realPrice', label: '總金額', width: ''},
                {prop: 'paidTime', label: '購買時間', width: ''},
                {prop: 'sellers', label: '商家暱稱', width: ''},
            ],
            tableData: [],
            dateTime:[]
        }
    },
    mounted(){
        this.getRefund(this.currentPage)
    },
    methods:{
        // 獲取所有退款訂單
        getRefund(currentPage,val,date=[]){
            this.$get("orderForm/queryRefundTrade",{
                val: val,
                startTime: date.length > 0 ? this.$getTimes(date[0]) : null,
                endTime:  date.length > 0 ? this.$getTimes(date[1]) : null,
                pageNum: currentPage ? currentPage : 1,
                pageSize: this.pageSize
            }).then(res => {
                if(res.code == 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                }
            })
        },
        //選擇時間
        date(val){
            this.dateTime = val;
            this.currentPage = 1;
            this.getRefund('','',val)
        },
        //點擊搜索按鈕
        search(val){
            this.dateTime = []
            this.currentPage = 1;
            this.getRefund(this.currentPage,val)
        },
        //點擊查看
        handleClick(row){
            this.$router.push({
                path:"/reBackOrderDetail",
                query:{
                    id:row.id
                }
            })
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.getRefund(val,'',this.dateTime)
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

