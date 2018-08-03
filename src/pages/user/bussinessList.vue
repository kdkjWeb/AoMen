<template>
    <div id="bussinessList">
        <searchBar :title="title" :placeholder="placeholder" @search="search"></searchBar>
        <div>
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                height="600">
                <el-table-column
                header-align = "center"
                v-for="(item,index) in tableList"
                :key="index"
                :prop="item.prop"
                :label="item.label">
                </el-table-column>
                <el-table-column
                header-align = "center"
                prop="detail"
                label="店鋪詳情"
                width="200px">
                <template slot-scope="scope"  v-show = "isShow"  class="handle">
                    <div>
                        <el-button round id="continue" type="success">解封</el-button>
                        <el-button round type="danger"  v-if="isShow == false">停封</el-button>
                        <el-button round @click="look(scope.row)">查看</el-button>
                    </div>
                    
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

    name:"bussinessList",
    components:{
        searchBar,
    },
    data(){
        return{
            title:"商家列表",
            placeholder:"請輸入用戶帳號",
            isShow:true,
            currentPage:1,
            pageSize:10,
            total:null,
            tableData: [],
            tableList:[
                {prop:"phone",label:"帳號",width:''},
                {prop:"nickname",label:"賬號昵稱",width:''},
                {prop:"shopName",label:"店鋪名稱",width:''},
                {prop:"registerTime",label:"註冊時間",width:''},
                {prop:"registerShopTime",label:"成為商家時間",width:''},
                {prop:"goodsCount",label:"商品數量",width:''},
                {prop:"balance",label:"賬戶餘額",width:''},
                {prop:"integral",label:"積分餘額",width:''}
            ]
        }
    },
    mounted() {
      this.getBussinessList(this.currentPage)
    },
    methods: {
        // 獲取所有商家列表
        getBussinessList(currentPage){
            this.$get("admin/getShopList",{
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }).then(res=>{
                console.log(res)
                if(res.code === 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list
                    for(var i = 0;i<this.tableData.length;i++) {
                        this.tableData[i].registerTime = this.$getTimes(this.tableData[i].registerTime);
                        this.tableData[i].registerShopTime = this.$getTimes(this.tableData[i].registerShopTime);
                    }
                }
            })
        },
        // 搜索
        search(val){
            this.$get("admin/getShopList",{
                keyWord:val,
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }).then(res=>{
                console.log(res)
                if(res.code === 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list
                   for(var i = 0;i<this.tableData.length;i++) {
                        this.tableData[i].registerTime = this.$getTimes(this.tableData[i].registerTime);
                        this.tableData[i].registerShopTime = this.$getTimes(this.tableData[i].registerShopTime);
                    }
                }
            })
        },
        // 查看
        look(row){
            console.log(row)
            this.id = row.id
            console.log(row.id)
            this.$router.push({
                path:"/bussinessDetail",
                query:{
                    id:this.id
                }
            })
        },
        // 分頁
        handleCurrentChange(val){
            this.currentPage = val;
            this.getBussinessList(this.currentPage)
        }
    }
}
</script>

<style>
    .el-table .cell{
        display: flex;
        justify-content: space-around;
    }
    .el-button.is-round{
        width:60px;
        padding: 10px 15px;
        border-radius: 20px;
    }
    
</style>
<style scoped>
    .handle{
        display: flex;
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

