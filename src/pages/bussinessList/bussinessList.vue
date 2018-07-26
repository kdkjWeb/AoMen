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
                <template slot-scope="scope">
                    <div v-show = "isShow" class="handle">
                        <el-button round id="refuse">拒絕</el-button>
                        <el-button round @click="look">查看</el-button>
                    </div>
                    <!-- <div v-if="isShow == false" class="handle">
                        <el-button round id="refuse">拒絕</el-button>
                        <el-button round>查看</el-button>
                    </div>
                    <div v-if="isShow == false" class="handle"> 
                        <el-button round id="refuse">拒絕</el-button>
                        <el-button round>查看</el-button>
                    </div>
                    <div v-if="isShow == false" class="handle">
                        <el-button round id="refuse">拒絕</el-button>
                        <el-button round>查看</el-button>
                    </div> -->
                </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400" 
                style="margin-top:10px">
                </el-pagination> -->
            </div>
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
            isShow:true,
            tableData: [{
                    account: '2016-05-03',
                    accountName: '王小虎',
                    shopName: '上海',
                    regiestTime: '普陀区',
                    becomeTime: '上海市普陀区金沙江路 1518 弄',
                    number: "200333",
                    accountBalance: "0",
                    integralBalance: "0"
                }, {
                    account: '2016-05-03',
                    accountName: '王小虎',
                    shopName: '上海',
                    regiestTime: '普陀区',
                    becomeTime: '上海市普陀区金沙江路 1518 弄',
                    number: "200333",
                    accountBalance: "0",
                    integralBalance: "0"
                }, {
                    account: '2016-05-03',
                    accountName: '王小虎',
                    shopName: '上海',
                    regiestTime: '普陀区',
                    becomeTime: '上海市普陀区金沙江路 1518 弄',
                    number: "200333",
                    accountBalance: "0",
                    integralBalance: "0"
                }, {
                    account: '2016-05-03',
                    accountName: '王小虎',
                    shopName: '上海',
                    regiestTime: '普陀区',
                    becomeTime: '上海市普陀区金沙江路 1518 弄',
                    number: "200333",
                    accountBalance: "0",
                    integralBalance: "0"
            }],
            tableList:[
                {prop:"account",label:"帳號",width:''},
                {prop:"accountName",label:"賬號昵稱",width:''},
                {prop:"shopName",label:"店鋪名稱",width:''},
                {prop:"regiestTime",label:"註冊時間",width:''},
                {prop:"becomeTime",label:"成為商家時間",width:''},
                {prop:"number",label:"店鋪數量",width:''},
                {prop:"accountBalance",label:"賬戶餘額",width:''},
                {prop:"integralBalance",label:"積分餘額",width:''}
               
            ]
        }
    },
    mounted() {
      
    },
    methods: {
      
      search(val){
          console.log(val)
      },
      look(){
          this.$router.push({
              path:"/bussinessDetail"
          })
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
    /* .block{
        float: right;
        height: 50px;
        margin-top: 20px;
    }
    .el-pagination button, .el-pagination span:not([class*=suffix]),.el-pager li,.el-pagination__editor.el-input .el-input__inner{
        height: 40px !important;
        line-height: 40px;
        font-size: 16px;
    }
    .el-pagination .el-select .el-input .el-input__inner{
        height: 43px !important;
        font-size: 16px;
    } */
</style>
<style scoped>
.handle{
    display: flex;
}
#refuse{
    color:#ef6868;
    border-color:#ef6868;
}
</style>

