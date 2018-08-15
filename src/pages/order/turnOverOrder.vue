<template>
    <div>
        <searchBar :title="title" :placeholder="placeholder" @search="search" @date="date" :isShow="isShow"></searchBar>
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
                :label="item.label">
                </el-table-column>
                <el-table-column
                header-align = "center"
                prop="status"
                label="訂單狀態">
                    <template slot-scope="scope">
                        <p v-if="scope.row.status == 6">已完結</p>
                        <p v-if="scope.row.status == 1 || scope.row.status == 2 || scope.row.status == 3">保護期</p>
                        <p v-if="scope.row.status == 5">已退款</p>
                        <p v-if="scope.row.status == 4">退款中</p>
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
    name:"turnOverOrder",
    components:{
        searchBar,
    },
    data(){
        return{
            isShow:true,
            title:"付款訂單",
            placeholder:"訂單號/商品名/商家昵稱",
            tableData: [],
            tableList:[
                {prop:"orderNum",label:"訂單號",width:''},
                {prop:"goodsName",label:"商品名稱",width:''},
                {prop:"unitPrice",label:"商品單價",width:''},
                {prop:"buyer",label:"購買用戶",width:''},
                {prop:"amount",label:"購買數量",width:''},
                {prop:"realPrice",label:"總金額",width:''},
                {prop:"paidTime",label:"購買時間",width:''},
                {prop:"sellers",label:"商家昵稱",width:''},
                {prop:"shopName",label:"店鋪昵稱",width:''},
            ],
            currentPage: 1,
            pageSize:10,
            total:null
        }
    },
    mounted(){
        this.getOrderBySuccess(this.currentPage)
    },
    methods:{
        // 獲取已成交訂單列表
        getOrderBySuccess(currentPage){
            this.$get("orderForm/queryExecutedOrder",{
                pageNum:this.currentPage,
                pageSize: this.pageSize
            }).then(res=>{
                console.log(res)
                if(res.code == 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                }
            })
        },
        // 按時間查詢
        date(val){
            this.$get("orderForm/queryExecutedOrder",{
                startTime: this.$getTimes(val[0]),
                endTime: this.$getTimes(val[1]),
                pageNum:this.currentPage,
                pageSize: this.pageSize
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
            this.$get("orderForm/queryExecutedOrder",{
                val:val,
                pageNum:this.currentPage,
                pageSize: this.pageSize
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
            this.getOrderBySuccess(this.currentPage);
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

