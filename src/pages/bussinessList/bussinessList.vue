<template>
    <div id="bussinessList">
        <div class="header">
            <p><span>|</span>商家列表</p>
        </div>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%"
                height="600">
                <el-table-column
                fixed
                prop="account"
                header-align = "center"
                label="帳號">
                </el-table-column>
                <el-table-column
                prop="accountName"
                header-align = "center"
                label="賬號昵稱">
                </el-table-column>
                <el-table-column
                prop="shopName"
                header-align = "center"
                label="店鋪名稱">
                </el-table-column>
                <el-table-column
                prop="regiestTime"
                header-align = "center"
                label="註冊時間">
                </el-table-column>
                <el-table-column
                prop="becomeTime"
                header-align = "center"
                label="成為商家時間">
                </el-table-column>
                <el-table-column
                header-align = "center"
                prop="number"
                label="店鋪數量">
                </el-table-column>
                <el-table-column
                header-align = "center"
                prop="accountBalance"
                label="賬戶餘額">
                </el-table-column>
                <el-table-column
                header-align = "center"
                prop="integralBalance"
                label="積分餘額">
                </el-table-column>
                <el-table-column
                header-align = "center"
                prop="detail"
                label="店鋪詳情"
                width="200px">
                <template slot-scope="scope">
                    <div v-show = "isShow" class="handle">
                        <el-button round id="refuse">拒絕</el-button>
                        <el-button round>查看</el-button>
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
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400" 
                style="margin-top:10px">
                </el-pagination>
            </div>
        </div>
       
    </div>
</template>

<script>
export default {
    name:"bussinessList",
    data(){
        return{
            isShow:true,
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
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
            }]
        }
    },
    mounted() {
      
    },
    methods: {
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
}
</script>

<style>
    #bussinessList .header{
        width:100%;
        height: 90px;
        background-color: #fff;
        margin-bottom: 20px;
    }
    #bussinessList .header p{
        line-height: 90px;
        font-size: 18px;
        font-weight: 700;
    }
    #bussinessList .header span{
        font-size: 28px;
        color: #f99e1b;
        padding-right: 20px;
    }
    .el-table .cell{
        display: flex;
        justify-content: space-around;
    }
    .el-button.is-round{
        width:60px;
        padding: 10px 15px;
        border-radius: 20px;
    }
    .block{
        float: right;
        height: 50px;
        margin-top: 20px;
    }
    .el-pagination button, .el-pagination span:not([class*=suffix]),.el-pager li,.el-pagination__editor.el-input .el-input__inner,.el-pagination .el-select .el-input .el-input__inner{
        height: 40px !important;
        line-height: 40px;
        font-size: 16px
    }
    
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

