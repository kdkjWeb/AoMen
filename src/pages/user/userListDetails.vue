<template>
    <div class="userDetails">
        <!-- 返回+查詢 -->
        <goBack  :placeholder="placeholder"></goBack>
        <!-- 返回+查詢 -->

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
                header-align = "center"
                prop="couponType "
                label="優惠類型">
                    <template slot-scope="scope">
                        <p v-if="scope.row.couponType == 0">無</p>
                        <p v-if="scope.row.couponType == 1">直接滿減</p>
                        <p v-if="scope.row.couponType == 2">直接折扣</p>
                        <p v-if="scope.row.couponType == 3">滿減領取</p>
                        <p v-if="scope.row.couponType == 4">滿減優惠券（平台）</p>
                        <p v-if="scope.row.couponType == 5">直接滿減優惠券（平台）</p>
                    </template>
                </el-table-column>
                <el-table-column
                header-align = "center"
                prop="status"
                label="訂單狀態">
                    <template slot-scope="scope">
                        <p v-if="scope.row.status == 6">已完結</p>
                        <p v-if="scope.row.status == 1 || scope.row.status == 2 || scope.row.status == 3">保護期</p>
                        <p v-if="scope.row.status == 5">已退款</p>
                        <p v-if="scope.row.status == 4">申請退款中</p>
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
import goBack from "./../../components/goBack"
export default {
    components:{
        goBack
    },
    data(){
        return{
            placeholder:"請輸入用戶帳號",
            currentPage: 1,
            pageSize:10,
            total:null,
            tableList:[
                {prop:'paidTime', label: '購買時間', width: ''},
                {prop:'orderNum', label: '訂單號', width: ''},
                {prop:'goodsName', label: '商品名稱', width: ''},
                {prop:'unitPrice', label: '單價', width: ''},
                {prop:'amount', label: '購買數量', width: ''},
                {prop:'totalPrice', label: '應付金額', width: ''},
                {prop:'realPrice', label: '實付金額', width: ''},
            ],
            tableData: []
        }
    },
    mounted(){
        this.getDetailByUser(this.$route.query.id,this.currentPage)
    },
    methods:{
        // 獲取用戶詳情列表
        getDetailByUser(currentPage,id){
            this.$get("orderForm/queryUserOrderList",{
                userId: this.$route.query.id,
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }).then(res=>{
                if(res.code == 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                    for(var i = 0;i<this.tableData.length;i++) {
                        this.tableData[i].paidTime = this.$getTimes(this.tableData[i].paidTime);
                    }
                }
            })
        },
        // 分頁
        handleCurrentChange(val){
            this.currentPage = val;
            this.getDetailByUser(this.currentPage)
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
