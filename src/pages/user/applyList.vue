<template>
    <div>
         <!-- start頂部搜索標題 -->
        <searchBar @search="search" :title="title" :placeholder="placeholder"></searchBar>
        <!-- end 頂部搜索標題 -->

        <!-- start 表格部分 -->
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
            header-align = "center"
            label="身份證图片"
            width="300px">
            <template slot-scope="scope">
               <img style="width:120px; height:80px" :src="scope.row.idCardFile1.origin" alt="">
               <img style="width:120px; height:80px" :src="scope.row.idCardFile2.origin" alt="">
            </template>
            </el-table-column>
            <el-table-column
            header-align = "center"
            label="營業執照圖片"
            width="160px">
            <template slot-scope="scope">
                <img style="width:120px; height:80px"  :src="scope.row.licenseFile.origin" alt="">
            </template>
            </el-table-column>
            <el-table-column
            header-align = "center"
            prop="status"
            label="申請結果">
            <template slot-scope="scope">
                <p v-if="scope.row.status == 0">正在審核</p>
                <p v-if="scope.row.status == 1">通過</p>
                <p v-if="scope.row.status == 2">拒絕</p>
            </template>
            </el-table-column>
            <el-table-column
            header-align = "center"
            label="操作"
            width="200">
            <template slot-scope="scope">
                <div v-if="scope.row.status != 1 && scope.row.status != 2">
                    <el-button @click="through(scope.row)" type="success" round plain>通過</el-button>
                    <el-button @click="refuse(scope.row)" type="danger" round plain>拒絕</el-button>
                </div>
                <p id="pass" v-if="scope.row.status == 1">已通過</p>
                <p id="no" v-if="scope.row.status == 2">已拒絕</p>
            </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total,prev, pager, next, jumper"
            :total="total" 
            style="margin-top:10px">
            </el-pagination>
        </div>
    </div>
        <!-- end 表格部分 -->
        <!-- start 彈出拒絕原因框 -->
        <el-dialog
            :visible.sync="dialogVisible"
            width="600px">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <h1>拒絕原因</h1>
                <el-form-item prop="desc">
                    <el-input type="textarea" v-model="form.desc" placeholder="請填寫拒絕原因" style="width:80%;"></el-input>
                </el-form-item>
                 <el-form-item>
                    <el-button type="warning" id="confirm" @click="sure">確定</el-button>
                </el-form-item>
                </el-form>
            </el-dialog>
        <!-- end 彈出拒絕原因框 -->
    </div>
</template>

<script>
import searchBar from './../../components/searchBar.vue'

export default {
    name:"applyList",
    components:{
        searchBar,
    },
    data(){
        return{
            title: '申請列表',
            placeholder: '請輸入用戶帳號',
            dialogVisible: false,
            form: {
                desc: '',
            },
            tableList: [
                {prop: 'userMsgVo.id', label: '申請帳號', width: ''},
                {prop: 'userMsgVo.nickname', label: '暱稱', width: ''},
                {prop: 'createTime', label: '申請時間', width: ''},
            ],
            tableData: [],
            currentPage:1,
            pageSize:10,
            total:null,
            rules:{
                desc:{required: true, message: '請輸入拒絕原因', trigger: 'blur'}
            },
        }
    },
    mounted(){
        this.getApplyList(this.currentPage)
    },
    methods:{
        //  獲取所有申請列表
        getApplyList(currentPage){
            this.$get("admin/getAuditApplyList",{
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }).then(res =>{
                console.log(res)
                if(res.code === 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                    for(let i = 0;i<this.tableData.length;i++){
                        this.tableData[i].createTime = this.$getTimes(this.tableData[i].createTime);
                    }
                }
            })
        },
        //搜索功能
        search(val){
           this.$get("admin/getAuditApplyList",{
                keyWord:val,
                pageNum: this.currentPage,
                pageSize: this.pageSize
           }).then(res =>{
               console.log(res)
               if(res.code === 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                 }
           })
        },
        //通過
        through(val) {
            this.id = val.id;
            this.$confirm('此操作將同意該申請, 是否繼續?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    console.log(this.id)
                    this.$post("admin/auditApply",{
                        id:this.id,
                        status:1
                    }).then(res =>{
                        console.log(res);
                        if(res.code === 0){
                            this.$message({
                                type: 'success',
                                message: '申請成功!'
                            });
                            this.getApplyList();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
        },
        //拒絕
        refuse(val){
            this.dialogVisible = true;
            this.id = val.id;
        },
        sure(val){
            this.$post("admin/auditApply",{
                id: this.id,
                reason: this.form.desc,
                status:2
            }).then(res =>{
                console.log(res);
                if(res.code === 0){
                    this.$message({
                        type: 'success',
                        message: '已拒绝!'
                    });
                    this.form.desc = "";
                    this.dialogVisible = false;
                    this.getApplyList()
                }else{
                    this.$message.error("請填寫拒絕原因")
                }
            })
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.getApplyList(this.currentPage)
        },
       
    }
}
</script>

<style>
    .el-table .cell{
        display: flex;
        justify-content: space-around;
    }
    .el-textarea__inner{
        height: 150px !important;
    }
</style>
<style scoped>
    #confirm{
        width:80%;
    }
    h1{
        text-align:center;
        font-size:16px;
        font-weight: 700;
        margin-bottom: 20px;
    }
    #pass,#no{
        width:115px;
        height: 40px;
        text-align:center;
        line-height: 40px;
        color:#fff;
        border-radius:50px;
    }
    #pass{
        background-color:#56d27f;
    }
    #no{
        background-color:#ef6868;
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

