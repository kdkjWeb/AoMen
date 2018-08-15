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
                :color="item.color"
                :label="item.label">
                </el-table-column>
                <el-table-column
                header-align = "center"
                label="賬戶餘額">
                <template slot-scope="scope">
                    <p style="color:red" v-show="isSuccess">{{scope.row.balance}}</p>
                </template>
                </el-table-column>
                <el-table-column
                header-align = "center"
                label="提現狀態">
                <template slot-scope="scope">
                    <p style="color:green" v-if="scope.row.status == 1">提現成功</p>
                    <p style="color:red" v-if="scope.row.status == -1">提現失敗</p>
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
            isSuccess:true,
            isFailed:false,
            title:"商家提現",
            placeholder:"商家帳號/店鋪名稱",
            tableData: [],
            tableList:[
                {prop:"phone",label:"商家帳號",width:''},
                {prop:"shopName",label:"店鋪名稱",width:''},
                {prop:"withdraw",label:"提現金額",width:''},
                {prop:"createTime",label:"提現時間",width:''},
            ],
            currentPage: 1,
            pageSize:10,
            total:null
        }
    },
    mounted(){
        this.getCashesList(this.currentPage)
    },
    methods:{
        getCashesList(){
            this.$get("withdrawalRecord/s_all",{
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }).then(res=>{
                if(res.code == 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                }
            })
        },
        // 按時間查詢
        date(val){
            this.$get("withdrawalRecord/s_all",{
                startTime: this.$getTimes(val[0]),
                endTime: this.$getTimes(val[1]),
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
            this.$get("withdrawalRecord/s_all",{
              val: val
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
            this.getCashesList(this.currentPage)
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
