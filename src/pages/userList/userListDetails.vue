<template>
    <div class="userDetails">
        <!-- 返回+查詢 -->
        <goBack  :placeholder="placeholder" @search="search"></goBack>
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
    methods:{
        search(val){
            console.log(val)
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
