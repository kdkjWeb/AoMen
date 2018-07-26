<template>
    <div>
        <!-- 返回+查詢 -->
        <goBack  :placeholder="placeholder" @search="search"></goBack>
        <!-- 返回+查詢 -->
        <div class="table">
        <!-- 表格 -->
            <el-table
                :data="tableData"
                border
                height="600"
                style="width: 100%">
                <el-table-column
                header-align = "center"
                label="店鋪圖片">
                <template slot-scope="scope">
                <img style="width:120px; height:80px" :src="scope.row.shopImg" alt="">
                </template>
                </el-table-column>
                <el-table-column
                header-align = "center"
                v-for="(item,index) in tableList"
                :key="index"
                :prop="item.prop"
                :label="item.label">
                </el-table-column>
            </el-table>
        <!-- 表格 -->
        <!-- 分頁 -->
        <div class="block"></div>
        <!-- 分頁 -->
        </div>
    </div>
</template>

<script>
import goBack from "./../../components/goBack"
export default {
    name:"bussinessDetail",
    components:{
        goBack
    },
    data(){
        return{
            placeholder:"請輸入用戶帳號",
            tableData: [{
                    shopImg: '../../../static/header.jpg',
                    shopName: '上海',
                    shopStyle: '普陀区',
                    creatTime: '上海市普陀区金沙江路 1518 弄',
                    number: "200333",
                    allMoney: "0"
                }, {
                    shopImg: '../../../static/header.jpg',
                    shopName: '上海',
                    shopStyle: '普陀区',
                    creatTime: '上海市普陀区金沙江路 1518 弄',
                    number: "200333",
                    allMoney: "0"
                }, {
                    shopImg: '../../../static/header.jpg',
                    shopName: '上海',
                    shopStyle: '普陀区',
                    creatTime: '上海市普陀区金沙江路 1518 弄',
                    number: "200333",
                    allMoney: "0"
                }, {
                    shopImg: '../../../static/header.jpg',
                    shopName: '上海',
                    shopStyle: '普陀区',
                    creatTime: '上海市普陀区金沙江路 1518 弄',
                    number: "200333",
                    allMoney: "0"
            }],
            tableList:[
                // {prop:"shopImg",label:"店鋪圖片",width:''},
                {prop:"shopName",label:"店鋪名稱",width:''},
                {prop:"shopStyle",label:"店鋪類型",width:''},
                {prop:"creatTime",label:"創建時間",width:''},
                {prop:"number",label:"成交數量",width:''},
                {prop:"allMoney",label:"總營業額",width:''}
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
