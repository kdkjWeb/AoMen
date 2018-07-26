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
            label="身份證圖片">
            <template slot-scope="scope">
               <img style="width:120px; height:80px" :src="scope.row.idCard" alt="">
            </template>
            </el-table-column>
            <el-table-column
            header-align = "center"
            label="營業執照圖片">
            <template slot-scope="scope">
                <img style="width:120px; height:80px"  :src="scope.row.businessLicense" alt="">
            </template>
            </el-table-column>
            <el-table-column
            header-align = "center"
            width="120"
            prop="status"
            label="申請結果">
            </el-table-column>
            <el-table-column
            header-align = "center"
            label="操作"
            width="300">
            <template slot-scope="scope">
                <el-button @click="through(scope.row)" type="primary" round>通過</el-button>
                <el-button @click="refuse(scope.row)" type="danger" round>拒絕</el-button>
                <el-button @click="deleted(scope.row)" round>刪除</el-button>
            </template>
            </el-table-column>
        </el-table>
        </div>
        <!-- end 表格部分 -->


        <!-- start 彈出拒絕原因框 -->
        <el-dialog
        title="請輸入拒絕理由"
        :visible.sync="dialogVisible"
        top="35vh"
        width="40%"
        >
        <el-form :model="form">
            <el-form-item>
            <el-input type="textarea" v-model="form.desc" placeholder="請輸入拒絕理由"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="comfirm">确 定</el-button>
        </span>
        </el-dialog>
        <!-- end 彈出拒絕原因框 -->
    </div>
</template>

<script>
import searchBar from './../../components/searchBar.vue'
export default {
    name:"applyList",
    components:{
        searchBar
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
                {prop: 'account', label: '申請帳號', width: '200'},
                {prop: 'nickName', label: '暱稱', width: '150'},
                {prop: 'applicationTime', label: '申請時間', width: '150'},
            ],
            tableData: [{
                account: '123456',
                nickName: '王小虎',
                applicationTime: '2018-11-15',
                idCard: '../../../static/header.jpg',
                businessLicense: '../../../static/header.jpg',
                status: '通過'
            },{
                account: '123456',
                nickName: '王小虎',
                applicationTime: '2018-11-15',
                idCard: '../../../static/header.jpg',
                businessLicense: '../../../static/header.jpg',
                status: '通過'
            },{
                account: '123456',
                nickName: '王小虎',
                applicationTime: '2018-11-15',
                idCard: '../../../static/header.jpg',
                businessLicense: '../../../static/header.jpg',
                status: '通過'
            },{
                account: '123456',
                nickName: '王小虎',
                applicationTime: '2018-11-15',
                idCard: '../../../static/header.jpg',
                businessLicense: '../../../static/header.jpg',
                status: '通過'
            },{
                account: '123456',
                nickName: '王小虎',
                applicationTime: '2018-11-15',
                idCard: '../../../static/header.jpg',
                businessLicense: '../../../static/header.jpg',
                status: '通過'
            },{
                account: '123456',
                nickName: '王小虎',
                applicationTime: '2018-11-15',
                idCard: '../../../static/header.jpg',
                businessLicense: '../../../static/header.jpg',
                status: '通過'
            },{
                account: '123456',
                nickName: '王小虎',
                applicationTime: '2018-11-15',
                idCard: '../../../static/header.jpg',
                businessLicense: '../../../static/header.jpg',
                status: '通過'
            },{
                account: '123456',
                nickName: '王小虎',
                applicationTime: '2018-11-15',
                idCard: '../../../static/header.jpg',
                businessLicense: '../../../static/header.jpg',
                status: '通過'
            }]
        }
    },
     methods:{
        //搜索功能
        search(val){
            console.log(val)
        },
        //通過
        through(row) {
            this.$confirm('此操作將同意該申請, 是否繼續?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '申請成功!'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消通過'
                });          
                });
        },
        //拒絕
        refuse(row){
            console.log(row)
            this.dialogVisible = true;
        },
        //刪除
        deleted(row){
            console.log(row)
             this.$confirm('此操作將永久刪除該數據, 是否繼續?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '刪除成功!'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消刪除'
                });          
                });
        },
        //彈出框的取消按鈕
        cancel(){
            this.dialogVisible = false;
        },
        //彈出框的確認按鈕
        comfirm(){
             this.$message({
            message: '點擊了確定按鈕',
            type: 'success'
            });
            this.dialogVisible = false;
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
