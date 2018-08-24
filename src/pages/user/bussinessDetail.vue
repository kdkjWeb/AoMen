<template>
    <div>
        <!-- 返回 -->
        <goBack  :placeholder="placeholder"></goBack>
        <!-- 返回 -->
        <!-- 聯繫人 -->
        <ul>
            <li>聯係人：<span>{{user.linkman?user.linkman:"暫無數據"}}</span></li>
            <li>聯係電話：<span>{{user.phone?user.phone:"暫無數據"}}</span></li>
            <li>聯係地址：<span>{{user.shopAddress?user.shopAddress:"暫無數據"}}</span></li>
        </ul>
        <!-- 聯繫人 -->
        <div class="table">
            <!-- 表格 -->
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                header-align = "center"
                label="商品圖片">
                <template slot-scope="scope">
                    <img :src="scope.row.origin" alt="" @click="ImgShow(scope.row)" class="img">
                </template>
                </el-table-column>
                <el-table-column
                prop="goodsName"
                header-align = "center"
                label="商品名称">              
                </el-table-column>
                <el-table-column
                prop="goodsType"
                header-align = "center"
                label="商品类型"
                >
                </el-table-column>
                <el-table-column
                header-align = "center"
                v-for="(item,index) in tableList"
                :key="index"
                :prop="item.prop"
                :label="item.label">
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
        <!-- 查看图片 -->
        <div v-show="isloading">
            <div class="loading" @click="close"></div>
            <img :src="origin" alt="" class="gif" @click="close">
        </div>
        <!-- 查看图片 -->
    </div>
</template>

<script>
import goBack from "./../../components/goBack"
export default {
    name:"bussinessDetail",
    components:{
        goBack
    },
    data(){
        return{
            isloading:false, //圖片是否顯示
            placeholder:"請輸入用戶帳號",
            tableData: [],
            tableList:[
                {prop:"createTime",label:"創建時間",width:''},
                {prop:"num",label:"成交數量",width:''},
                {prop:"amount",label:"總營業額",width:''}
            ],
            user:[],
            currentPage: 1,
            pageSize:10,
            total:null,
            origin:"" //點擊后顯示的圖片
        }
    },
    mounted(){
        this.getDetailByBussiness(this.$route.query.id);
    },
    methods:{
        // 獲取商家詳情列表
        getDetailByBussiness(id,currentPage){
           this.$get("shop/s_goods",{
               shopId: this.$route.query.id,
               pageNum: currentPage ?currentPage : 1,
               pageSize: this.pageSize
           }).then(res=>{
               if(res.code == 0){
                    this.user = [];
                    this.tableData = [];
                    this.user.linkman = res.linkman;
                    this.user.phone = res.phone;
                    this.user.shopAddress = res.shopAddress;
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    for(var i = 0;i<this.tableData.length;i++) {
                        this.tableData[i].createTime = this.$getTimes(this.tableData[i].createTime);
                    }
               }else{
                   this.$message.error("沒有記錄")
               }
           })
        },
        // 點擊圖片
        ImgShow(val){
            this.isloading = true;
            this.id = val.id;
            this.origin = val.origin;
        },
        // 點擊任意處圖片消失
        close(){
            this.isloading = false;
        },
        // 分頁
        handleCurrentChange(val){
            this.currentPage = val;
            this.getDetailByBussiness(this.currentPage)
        }
    }
}
</script>

<style>
/* 表格內容及中 */
.el-table .cell{
    display: flex;
    justify-content: space-around;
}
</style>
<style scoped>
/* 點擊顯示后圖片樣式 */
.img{
    width:120px;
    height:80px
}
.img:hover{
    cursor:pointer;
}
.loading {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,.9);
    opacity: 0.4;
    z-index: 10000;
}
.gif {
    height: 600px;
    width: 600px;
    position: fixed;
    left: 35%;
    top: 30%;
    margin-left: -16px;
    margin-top: -16px;
    z-index: 10001;
    background-size:100% 100%;
}
.gif:hover,.loading:hover{
    cursor:pointer;
}
/* 點擊顯示后圖片樣式 */
/* 聯繫人 */
ul{
    width:100%;
    height:100px;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    margin-bottom: 20px;
}
ul li{
    font-size:16px;
    line-height: 100px;
}
/* 聯繫人 */
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
