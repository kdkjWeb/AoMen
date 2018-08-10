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
                prop="orderStatus"
                header-align = "center"
                label="訂單狀態">
                <template slot-scope="scope">
                    <p style="color:red;text-decoration:underline;">未處理</p>
                    <p>已處理</p>
                </template>
                </el-table-column>
                <el-table-column
                header-align = "center"
                label="退款詳情"
                width="100">
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
                {prop:'productName', label: '商品名稱', width: ''},
                {prop:'univalent', label: '商品單價', width: ''},
                {prop: 'byUser', label: '購買用戶', width: ''},
                {prop: 'byNum', label: '購買數量', width: ''},
                {prop: 'allMoney', label: '總金額', width: ''},
                {prop: 'byTime', label: '購買時間', width: ''},
                {prop: 'busNickname', label: '商家暱稱', width: ''},
            ],
            tableData: [
                {
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    byUser: '隔壁老王',
                    byNum: '5',
                    allMoney: '115',
                    byTime: '2018-11-12',
                    busNickname: '猜猜我是誰',
                    orderStatus: '已處理'
                },{
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    byUser: '隔壁老王',
                    byNum: '5',
                    allMoney: '115',
                    byTime: '2018-11-12',
                    busNickname: '猜猜我是誰',
                    orderStatus: '已處理'
                },{
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    byUser: '隔壁老王',
                    byNum: '5',
                    allMoney: '115',
                    byTime: '2018-11-12',
                    busNickname: '猜猜我是誰',
                    orderStatus: '已處理'
                },{
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    byUser: '隔壁老王',
                    byNum: '5',
                    allMoney: '115',
                    byTime: '2018-11-12',
                    busNickname: '猜猜我是誰',
                    orderStatus: '已處理'
                },{
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    byUser: '隔壁老王',
                    byNum: '5',
                    allMoney: '115',
                    byTime: '2018-11-12',
                    busNickname: '猜猜我是誰',
                    orderStatus: '已處理'
                },{
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    byUser: '隔壁老王',
                    byNum: '5',
                    allMoney: '115',
                    byTime: '2018-11-12',
                    busNickname: '猜猜我是誰',
                    orderStatus: '已處理'
                },{
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    byUser: '隔壁老王',
                    byNum: '5',
                    allMoney: '115',
                    byTime: '2018-11-12',
                    busNickname: '猜猜我是誰',
                    orderStatus: '已處理'
                },{
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    byUser: '隔壁老王',
                    byNum: '5',
                    allMoney: '115',
                    byTime: '2018-11-12',
                    busNickname: '猜猜我是誰',
                    orderStatus: '已處理'
                },{
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    byUser: '隔壁老王',
                    byNum: '5',
                    allMoney: '115',
                    byTime: '2018-11-12',
                    busNickname: '猜猜我是誰',
                    orderStatus: '已處理'
                },{
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    byUser: '隔壁老王',
                    byNum: '5',
                    allMoney: '115',
                    byTime: '2018-11-12',
                    busNickname: '猜猜我是誰',
                    orderStatus: '已處理'
                },{
                    orderNum: '123456',
                    productName: '王者榮耀',
                    univalent: '23',
                    byUser: '隔壁老王',
                    byNum: '5',
                    allMoney: '115',
                    byTime: '2018-11-12',
                    busNickname: '猜猜我是誰',
                    orderStatus: '已處理'
                }]
        }
    },
    methods:{
        //選擇時間
        date(val){
            console.log(val)
        },
        //點擊搜索按鈕
        search(val){
            console.log(val)
        },
        //點擊查看
        handleClick(row){
            this.$router.push({
                path:"/reBackOrderDetail"
            })
        },
        handleCurrentChange(){
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

