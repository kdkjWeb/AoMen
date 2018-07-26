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
            :label="item.label">
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
        </div>
        <!-- end 表格部分 -->
    </div>
</template>

<script>
import searchBar from './../../components/searchBar.vue'
export default {
    name:"user",
    components:{
        searchBar
    },
    data(){
        return{
            title: '用戶列表',
            placeholder: '請輸入用戶帳號',
            tableData: [{
            account: '123456',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '是',
            },{
            account: '987654321',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '否',
            },{
            account: '123456',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '是',
            },{
            account: '987654321',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '否',
            },{
            account: '123456',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '是',
            },{
            account: '987654321',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '否',
            },{
            account: '123456',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '是',
            },{
            account: '987654321',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '否',
            },{
            account: '123456',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '是',
            },{
            account: '987654321',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '否',
            },{
            account: '123456',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '是',
            },{
            account: '987654321',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '否',
            },{
            account: '123456',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '是',
            },{
            account: '987654321',
            nickName: '王小虎',
            gender: '男',
            registTime: '2018-11-15',
            userLevel: '16',
            pointBalance: '123',
            isMerchant: '否',
            }],
            tableList: [
                {prop: 'account', label: '帳號', width: ''},
                {prop: 'nickName', label: '暱稱', width: ''},
                {prop: 'gender', label: '性別', width: ''},
                {prop: 'registTime', label: '註冊時間', width: ''},
                {prop: 'userLevel', label: '用戶等級', width: ''},
                {prop: 'pointBalance', label: '積分餘額', width: ''},
                {prop: 'isMerchant', label: '是否商家', width: ''}
            ]
        }
    },
    methods:{
        //搜索功能
        search(val){
            console.log(val)
        },
        //查看消費詳情
         handleClick(row) {
            console.log(row);
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
