<template>
    <div>
        <searchBar :title="title" :placeholder="placeholder" @search="search" @date="date" :isShow="isShow"></searchBar>
        <div class="table">
            <el-table
                :data="tableData"
                border
                height="600"
                style="width: 100%">
                <el-table-column
                header-align = "center"
                v-for="(item,index) in tableList"
                :key="index"
                :prop="item.prop"
                :color="item.color"
                :label="item.label">
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
            title:"商家提現",
            placeholder:"訂單號/商品名/商家昵稱",
            tableData: [{
                   shopNumber: '1234',
                    bussinessAcount: '789',
                    AccountBalance: "2",
                    cashState: "提現成功",
                    cashTime: "2018-07-26",
                    cashAmount: "60",
                }, {
                   shopNumber: '1234',
                    bussinessAcount: '789',
                    AccountBalance: "2",
                    cashState: "提現成功",
                    cashTime: "2018-07-26",
                    cashAmount: "60",
                }, {
                   shopNumber: '1234',
                    bussinessAcount: '789',
                    AccountBalance: "2",
                    cashState: "提現成功",
                    cashTime: "2018-07-26",
                    cashAmount: "60",
                }, {
                    shopNumber: '1234',
                    bussinessAcount: '789',
                    AccountBalance: "2",
                    cashState: "提現成功",
                    cashTime: "2018-07-26",
                    cashAmount: "60",
            }],
            tableList:[
                {prop:"bussinessAcount",label:"商家帳號",width:''},
                {prop:"shopNumber",label:"店鋪名稱",width:''},
                {prop:"cashAmount",label:"提現金額",width:''},
                {prop:"cashTime",label:"提現時間",width:''},
                {prop:"AccountBalance",label:"賬戶餘額",width:'',color:"red"},
                {prop:"cashState",label:"提現狀態",width:'',color:"green"}
            ],
            currentPage: 1,
            pageSize:10,
            total:null
        }
    },
    methods:{
        date(val){
            console.log(val)
        },
        search(val){
            console.log(val)
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        handleCurrentChange(val){
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
