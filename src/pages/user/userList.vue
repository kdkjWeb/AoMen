<template>
    <div>
        <!-- start頂部搜索標題 -->
        <searchBar @search="search" :title="title" :placeholder="placeholder"></searchBar>
        <!-- end 頂部搜索標題 -->
        <div class="table">
            <!-- start 表格部分 -->
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                header-align = "center"
                prop="phone"
                label="賬號">
                </el-table-column>
                <el-table-column
                header-align = "center"
                prop="sex"
                label="性別">
                <template slot-scope="scope">
                    <p v-if="scope.row.sex == null">未設置</p>
                    <p v-if="scope.row.sex == 0">男</p>
                    <p v-if="scope.row.sex == 1">女</p>
                </template>
                </el-table-column>
                <el-table-column
                header-align = "center"
                v-for="(item,index) in tableList"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :height="item.height">
                </el-table-column>
                <el-table-column
                header-align = "center"
                prop="roleId"
                label="是否為商家">
                <template slot-scope="scope">
                    <p v-if="scope.row.sex == null">否</p>
                    <p v-else>是</p>
                </template>
                </el-table-column>
                <el-table-column
                header-align = "center"
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">消費詳情</el-button>
                </template>
                </el-table-column>
            </el-table>
            <!-- end 表格部分 -->
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
import searchBar from './../../components/searchBar.vue'
export default {
    name:"user",
    components:{
        searchBar,
    },
    data(){
        return{
            title: '註冊用戶列表',
            placeholder: '請輸入用戶帳號',
            currentPage:1,
            pageSize:10,
            total:null,
            tableData: [],
            tableList: [
                {prop: 'nickname', label: '暱稱', height: '200px'},
                {prop: 'createTime', label: '註冊時間', height: '200px'},
                {prop: 'level', label: '用戶等級', height: '200px'},
                {prop: 'integral', label: '積分餘額（個）', height: '200px'},
            ],
            sVal:''  //按用戶賬號搜索
        }
    },
    mounted(){
        this.getUserList(this.currentPage)
    },
    methods:{
        // 獲取所有列表
        getUserList(currentPage,val){
            this.$get("admin/getUsersList",{
                keyWord: val,
                pageNum: this.currentPage ? this.currentPage : 1,
                pageSize: this.pageSize,
            }).then(res =>{
                if(res.code === 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                }else{
                    this.$message.error("沒有記錄")
                }
            })
        },
        //搜索功能
        search(val){
            this.sVal = val
            this.currentPage = 1
            this.getUserList(this.currentPage,this.sVal)
            
        },
        //查看消費詳情
        handleClick(row) {
             this.id = row.id
            this.$router.push({
                name: 'userListDetails',
                query:{
                    id:this.id
                }
            })
        },
        // 分頁
        handleCurrentChange(val){
            this.currentPage = val
            this.getUserList(this.currentPage,this.sVal)
        }
    }
}
</script>

<style>
/* 表格內容居中 */
.el-table .cell{
    display: flex;
    justify-content: space-around;
    line-height: 35px;
}
</style>
<style scoped>
/* 分頁樣式 */
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

