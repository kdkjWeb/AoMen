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
                <template slot-scope="scope" v-if="scope.row.idCardFile1 != undefined && scope.row.idCardFile2 != undefined">
                    <img :src="scope.row.idCardFile1.origin" alt="" @click="ImgShow(scope.row.idCardFile1)" class="img">
                    <img :src="scope.row.idCardFile2.origin" alt="" @click="ImgShow1(scope.row.idCardFile2)" class="img">
                </template>
                </el-table-column>
                <el-table-column
                header-align = "center"
                label="營業執照圖片"
                width="160px">
                <template slot-scope="scope" v-if="scope.row.licenseFile != undefined">
                    <img :src="scope.row.licenseFile.origin" alt="" @click="ImgShow2(scope.row.licenseFile)" class="img">
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
            <!-- end 表格部分 -->
            <!-- 分頁 -->
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
            <!-- 分頁 -->
    </div>
        <!-- start 彈出拒絕原因框 -->
        <el-dialog
            :visible.sync="dialogVisible"
            width="600px">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <h1>拒絕原因</h1>
                <el-form-item prop="desc">
                    <el-input type="textarea" v-model="form.desc" placeholder="請填寫拒絕原因" style="width:80%;position:relative" @input="discuss"></el-input>
                    <p style="position:absolute;top:80%;right:25%;color:#ccc"><span>{{num}}</span>/<span>{{totalNum}}</span></p>
                </el-form-item>
                 <el-form-item>
                    <el-button type="warning" id="confirm" @click="sure">確定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- end 彈出拒絕原因框 -->
        <!-- 圖片是否顯示 -->
        <div v-show="isloading">
            <div class="loading" @click="close"></div>
            <img :src="origin" alt="" class="gif" @click="close">
        </div>
        <!-- 圖片是否顯示 -->
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
            isloading:false, //圖片是否顯示
            title: '店鋪申請列表',
            placeholder: '請輸入用戶帳號',
            dialogVisible: false,  //是否顯示拒絕彈框
            form: {
                desc: '',  //拒絕理由
            },
            tableList: [
                {prop: 'userMsgVo.phone', label: '申請帳號', width: ''},
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
            origin:'',  //點擊后顯示的圖片
            totalNum:"100", //評論字數總數限制
            num:"0", //當前輸入字數
            sVal:""  //按用戶賬號搜索
        }
    },
    mounted(){
        this.getApplyList()
    },
    methods:{
        //  獲取所有申請列表
        getApplyList(currentPage , val){
            this.$get("admin/getAuditApplyList",{
                keyWord: val,
                pageNum: currentPage ? currentPage : 1,
                pageSize: this.pageSize
            }).then(res =>{
                if(res.code === 0){
                    this.tableData = [];
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                    
                    for(let i = 0;i<this.tableData.length;i++){
                        this.tableData[i].createTime = this.$getTimes(this.tableData[i].createTime);
                    }
                }else{
                    this.$message.error("没有记录")
                }
            })
        },
        //搜索功能
        search(val){
            this.sVal = val
            this.currentPage = 1;
            this.getApplyList(this.currentPage,this.sVal)
        },
        // 身份證圖片（1）
        ImgShow(val){
            this.isloading = true;
            this.id = val.id;
            this.origin = val.origin; 
        },
        // 身份證圖片（2）
        ImgShow1(val){
            this.isloading = true;
            this.id = val.id;
            this.origin = val.origin;
        },
        // 營業執照圖片
        ImgShow2(val){
            this.isloading = true;
            this.id = val.id;
            this.origin = val.origin;
        },
        // 點擊任意處關閉圖片
        close(){
            this.isloading = false;
        },
        //通過
        through(val) {
            this.id = val.id;
            this.$confirm('此操作將同意該申請, 是否繼續?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$post("admin/auditApply",{
                        id:this.id,
                        status:1
                    }).then(res =>{
                        if(res.code === 0){
                            this.$message({
                                type: 'success',
                                message: '已同意該申請!'
                            });
                            this.getApplyList();
                        }else{
                            this.$message.error("無法同意該申請")
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
            this.form.desc = "";
            this.num = "0"
            this.dialogVisible = true;
            this.id = val.id;
        },
        // 確認拒絕
        sure(val){
            if(this.form.desc == ""){
                this.$message.error("拒絕原因不能為空")
            }else if(this.num > this.totalNum){
                this.$message.error("請注意保持字數在100字及其以內")
            }else{
                this.$post("admin/auditApply",{
                    id: this.id,
                    reason: this.form.desc,
                    status:2
                }).then(res =>{
                    if(res.code === 0){
                        this.$message({
                            type: 'success',
                            message: '已拒绝該申請!'
                        });
                        this.form.desc = "";
                        this.dialogVisible = false;
                        this.getApplyList()
                    }else{
                        this.$message.error("無法拒絕該申請！")
                    }
                })
            }
        },
        // 評論字數
        discuss(){
            var text = this.form.desc.length;
            // 顯示剩餘文字字數（為0 后依然減下去）
            // this.num = this.totalNum -text
            // 顯示輸入文字字數
            this.num = text

        },
        // 分頁
        handleCurrentChange(val){
            this.currentPage = val;
            this.getApplyList(this.currentPage,this.sVal)
        },
       
    }
}
</script>

<style>
/* 表格內容居中 */
.el-table .cell{
    display: flex;
    justify-content: space-around;
}
/* 拒絕理由 */
.el-textarea__inner{
    height: 230px ;
}
</style>
<style scoped>
/* 點擊后圖片樣式 */
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
/* .gif:hover{
    transform:scale(1.5);
} */
/* 點擊后圖片樣式 */
/* 同意、拒絕 */
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
h1{
    text-align:center;
    font-size:16px;
    font-weight: 700;
    margin-bottom: 20px;
}
#confirm{
    width:80%;
}
/* 同意、拒絕 */
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

