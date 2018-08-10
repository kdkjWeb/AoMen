<template>
    <div class="userDetails">
        <!-- 返回+查詢 -->
        <goBack  :placeholder="placeholder" @search="search" :isShow="true"></goBack>
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
                {prop:'byTime', label: '購買時間', width: ''},
                {prop:'orderNum', label: '訂單號', width: ''},
                {prop:'productName', label: '商品名稱', width: ''},
                {prop:'univalent', label: '單價', width: ''},
                {prop:'offerType', label: '優惠類型', width: ''},
                {prop:'byNum', label: '購買數量', width: ''},
                {prop:'cope', label: '應付金額', width: ''},
                {prop:'actuallyPaid', label: '實付金額', width: ''},
                {prop:'orderStatus', label: '訂單狀態', width: ''}
            ],
            tableData: [
                {
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                },{
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                },{
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                },{
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                },{
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                },{
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                },{
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                },{
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                },{
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                },{
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                },{
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                },{
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                },{
                    byTime: '2018-11-12',
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    offerType: '無',
                    byNum: '5',
                    cope: '115',
                    actuallyPaid: '115',
                    orderStatus: '已完結'
                }
            ]
        }
    },
    mounted(){

    },
    methods:{
        // 獲取用戶詳情列表
        getUserDatailList(){

        },
        search(val){
            console.log(val)
        },
        handleCurrentChange(){
            
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
