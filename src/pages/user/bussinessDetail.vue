<template>
    <div>
        <!-- 返回+查詢 -->
        <goBack  :placeholder="placeholder" @search="search" :isShow="true"></goBack>
        <ul>
            <li>聯係人：<span>12345</span></li>
            <li>聯係電話：<span>13255555555</span></li>
            <li>聯係地址：<span>四川省成都市天府三街112號</span></li>
        </ul>
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
                <img style="width:80px; height:80px" :src="scope.row.shopImg" alt="">
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
                {prop:"shopName",label:"店鋪名稱",width:''},
                {prop:"shopStyle",label:"店鋪類型",width:''},
                {prop:"creatTime",label:"創建時間",width:''},
                {prop:"number",label:"成交數量",width:''},
                {prop:"allMoney",label:"總營業額",width:''}
            ],
            currentPage: 1,
            pageSize:10,
            total:null
        }
    },
    methods:{
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
    ul{
        width:100%;
        height:100px;
        display: flex;
        justify-content: space-around;
        background-color: #fff;
        margin-bottom: 20px;
    }
    ul li{
        font-size:16px;
       line-height: 100px;
    }
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
