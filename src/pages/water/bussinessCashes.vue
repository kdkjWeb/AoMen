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
                label="賬戶餘額（MOP$）">
                <template slot-scope="scope">
                    <p style="color:red">{{scope.row.balance}}</p>
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
            title:"商家提現",
            placeholder:"商家帳號/店鋪名稱",
            tableData: [],
            tableList:[
                {prop:"phone",label:"商家帳號",width:''},
                {prop:"shopName",label:"店鋪名稱",width:''},
                {prop:"withdraw",label:"提現金額（MOP$）",width:''},
                {prop:"createTime",label:"提現時間",width:''},
            ],
            currentPage: 1,
            pageSize:10,
            total:null,
            dateTime:[]
        }
    },
    mounted(){
        this.getCashesList(this.currentPage)
    },
    methods:{
        getCashesList(currentPage,val,date=[]){
            this.$get("withdrawalRecord/s_all",{
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
                    this.$message.error("沒有記錄！")
                }
            })
        },
        // 按時間查詢
        date(val){
            this.dateTime = val;
            this.currentPage = 1;
            this.getCashesList('','',val);
        },
        // 查詢
        search(val){
            this.dateTime = []
            this.currentPage = 1
            this.getCashesList(this.currentPage,val)
        },
        // 分頁
        handleCurrentChange(val){
            this.currentPage = val;
            this.getCashesList(val,'',this.dateTime)
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
