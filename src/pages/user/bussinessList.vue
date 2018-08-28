<template>
    <div id="bussinessList">
        <!-- 查詢 -->
        <searchBar :title="title" :placeholder="placeholder" @search="search"></searchBar>
        <!-- 查詢 -->
        <div class="table">
            <!-- 表格 -->
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                header-align = "center"
                v-for="(item,index) in tableList"
                :key="index"
                :prop="item.prop"
                :label="item.label">
                </el-table-column>
                <el-table-column
                header-align = "center"
                prop="status"
                label="当前店铺状态">
                <template slot-scope="scope">
                    <p  v-if="scope.row.status == 1" style="color:red">停封</p>
                    <p v-if="scope.row.status == 0" style="color:green">正常</p>
                </template>
                </el-table-column>
                <el-table-column
                header-align = "center"
                label="操作"
                width="280px">
                <template slot-scope="scope" class="handle">
                    <div>
                        <el-button round type="danger" @click="stop(scope.row)">停封</el-button>
                        <el-button round type="success" @click="deblock(scope.row)">解封</el-button>
                        <el-button round @click="look(scope.row)">查看</el-button>
                    </div>
                </template>
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
import searchBar from "./../../components/searchBar.vue"
export default {
    name:"bussinessList",
    components:{
        searchBar
    },
    data(){
        return{
            title:"商家列表",
            placeholder:"請輸入用戶帳號",
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
                {prop:"goodsCount",label:"商品數量（個）",width:''},
                {prop:"balance",label:"賬戶餘額(MOP$)",width:''},
                {prop:"integral",label:"積分餘額（個）",width:''}
            ],
            sVal:"" //按用戶賬號搜索
        }
    },
    mounted() {
      this.getBussinessList(this.currentPage)
    },
    methods: {
        // 獲取所有商家列表
        getBussinessList(currentPage,val){
            this.$get("admin/getShopList",{
                keyWord:val,
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }).then(res=>{
                if(res.code === 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list
                    for(var i = 0;i<this.tableData.length;i++) {
                        this.tableData[i].registerTime = this.$getTimes(this.tableData[i].registerTime);
                        this.tableData[i].registerShopTime = this.$getTimes(this.tableData[i].registerShopTime);
                    }
                }else{
                    this.$message.error("沒有記錄")
                }
            })
        },
        // 搜索
        search(val){
            this.sVal = val
            this.currentPage = 1;
            this.getBussinessList(this.currentPage,this.sVal)
        },
        // 查看
        look(row){
            this.id = row.id
            this.$router.push({
                path:"/bussinessDetail",
                query:{
                    id: this.id,
                }
            })
        },
        // 停封
        stop(val){
            this.$confirm('此操作將會使商家處於停封狀態, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$post("shop/deactivationAndUnsealing?shopId=" + val.id +"&yesOrNo=" + true).then(res=>{
                    if(res.code == 0){  
                        this.$message({
                            type: 'success',
                            message: '已成功將該商家停封!'
                        });
                        this.getBussinessList()
                    }else{
                        this.$message.error("未能將該商家停封")
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消對該商家的停封'
                });          
            });
        },
        // 解封
        deblock(val){
            this.$confirm('此操作將會使商家處於解封狀態, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$post("shop/deactivationAndUnsealing?shopId=" + val.id +"&yesOrNo=" + false).then(res=>{
                    if(res.code == 0){
                        this.$message({
                            type: 'success',
                            message: '已成功將該商家解封!'
                        });
                        this.getBussinessList()
                    }else{
                        this.$message.error("未能將該商家解封")
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消對該商家的解封'
                });          
            });
        },
        // 分頁
        handleCurrentChange(val){
            this.currentPage = val;
            this.getBussinessList(this.currentPage,this.sVal)
        }
    }
}
</script>

<style>
/* 表格內容居中 */
#bussinessList .el-table .cell{
    display: flex;
    justify-content: space-around;
}
/* 解封、停封、查看按鈕 */
    #bussinessList .el-button.is-round{
        width:75px;
        border-radius: 20px;
    }
</style>
<style scoped>
/* 操作 */
.handle{
    display: flex;
}
/* 分頁 */
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

