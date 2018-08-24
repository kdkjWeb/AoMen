<template>
    <div>
        <!-- 查詢 -->
        <searchBar :title="title" :placeholder="placeholder" @search="search" @date="date" :isShow="isShow"></searchBar>
        <!-- 查詢 -->
        <div class="table">
            <!-- 表格 -->
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
                        <p v-if="scope.row.status == 6" style="color:#f99e1b">已完結</p>
                        <p v-if="scope.row.status == 1 || scope.row.status == 2 || scope.row.status == 3" style="color:green">保護期</p>
                        <p v-if="scope.row.status == 5" style="color:red">已退款</p>
                        <p v-if="scope.row.status == 4" style="color:#3f51b5">申請退款中</p>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 表格 -->
            <!-- 分頁 -->
            <div class="block">
                <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total" 
                style="margin-top:10px">
                </el-pagination>
            </div>
            <!-- 分頁 -->
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
            dateTime: [],   //日期
            isShow:true,    //日期查詢是否顯示
            title:"付款訂單",
            placeholder:"訂單號/商品名/商家昵稱",
            tableData: [],
            tableList:[
                {prop:"orderNum",label:"訂單號",width:''},
                {prop:"goodsName",label:"商品名稱",width:''},
                {prop:"unitPrice",label:"商品單價（MOP$）",width:''},
                {prop:"buyer",label:"購買用戶",width:''},
                {prop:"amount",label:"購買數量（個）",width:''},
                {prop:"realPrice",label:"總金額（MOP$）",width:''},
                {prop:"paidTime",label:"購買時間",width:''},
                {prop:"sellers",label:"商家昵稱",width:''},
                {prop:"shopName",label:"店鋪昵稱",width:''}
            ],
            currentPage: 1,
            pageSize:10,
            total:null
        }
    },
    mounted(){
        this.getOrderBySuccess()
    },
    methods:{
        // 獲取已成交訂單列表
        getOrderBySuccess(currentPage,val = '', date = []){
            this.$get("orderForm/queryExecutedOrder",{
                val: val,
                startTime: date.length >0 ? this.$getTimes(date[0]) : null,
                endTime:  date.length >0 ? this.$getTimes(date[1]) : null,
                pageNum: currentPage ? currentPage : 1,
                pageSize: this.pageSize
            }).then(res=>{
                if(res.code == 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                }else{
                    this.$message.error("沒有記錄")
                }
            })
        },
        // 按時間查詢
        date(val){
            this.dateTime = val;
            this.currentPage = 1;
            this.getOrderBySuccess('','',val)
        },
        // 查詢
        search(val){
            this.dateTime = []
            this.currentPage = 1;
            this.getOrderBySuccess(this.currentPage,val)
        },
        // 分頁
        handleCurrentChange(val){
            this.getOrderBySuccess(val,'',this.dateTime);
        }
    }
}
</script>

<style>
/* 表格內容居中 */
.el-table .cell{
    display: flex;
    justify-content: space-around;
}
/* 日期樣式 */
.el-date-editor--daterange.el-input__inner{
    width:240px !important;
}
/* .el-input--suffix .el-input__inner{
    width:100% !important;
    height: 50px;
    border-radius: 8px;
} */
</style>
<style scoped>
/* 分頁 */
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

