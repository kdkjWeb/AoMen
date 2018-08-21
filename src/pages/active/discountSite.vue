<template>
    <div>
        <!-- 新建表頭 -->
        <newBuild @add="add" :isAdd="true" :title="title"></newBuild>
        <!-- 新建表頭 -->
        <!-- 列表 -->
        <div class="content">
            <div class="list" v-for="(list,index) in lists" :key="index">
                <ul class="left">
                    <li class="money">
                        <el-tooltip class="item" effect="dark" :content=list.couponName placement="top-start" style="margin-right:30px">
                            <h1>{{list.couponName}}</h1>
                        </el-tooltip>
                        <span v-show="list.isBegin" style="color:green">未開始···</span>
                        <span v-show="list.isBegining">進行中···</span>
                        <span v-show="list.isOver" style="color:red">已結束···</span>
                    </li>
                    <li v-if="list.couponType == 4">滿{{list.conditionAmount}}圓減{{list.discount}}圓優惠券</li>
                    <li v-if="list.couponType == 5">直減{{list.discount}}圓優惠券</li>
                    <li>剩餘數量：{{list.amount}}</li>
                    <li>{{list.beginTime}} 至 {{list.stopTime}}</li>
                </ul>
                <el-button type="danger" @click="delet(list,index)">刪除</el-button>
            </div>
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
        <!-- 列表 -->
        
        <!-- 新建框 -->
        <el-dialog
            :visible.sync="dialogVisible"
            width="35%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名稱：" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入代金券名稱"></el-input>
                </el-form-item>
                <el-form-item label="需要積分：" prop="need">
                    <el-input v-model="ruleForm.need" placeholder="请输入需要的積分"></el-input>
                </el-form-item>
                <el-form-item label="發行數量：" prop="number" style="margin-bottom:30px">
                    <el-input placeholder="请输入您想要發行的數量" v-model="ruleForm.number" >
                        <template slot="append">張</template>
                    </el-input>
                </el-form-item >
                <el-form-item  id="preferential" style="border-top:1px solid #ccc;padding-top:30px">
                    <el-radio-group v-model="ruleForm.contentType" @change="handleChange">
                        <el-radio-button :label="5">直接代金券</el-radio-button>
                    </el-radio-group>
                    <el-radio-group v-model="ruleForm.contentType" @change="handleCut">
                        <el-radio-button :label="4">满减代金券</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <div class="voucher">
                    <div class="price">
                        <el-form-item prop="full"  v-show="isShow" style="position:relative" >
                            <div id="full">
                                <label> <em>*</em>满：</label>
                            </div>
                            <el-input placeholder="例：10" v-model="ruleForm.full">
                                <template slot="append">圓</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="減：" prop="cut">
                            <el-input placeholder="例：5" v-model="ruleForm.cut">
                                <template slot="append">圓</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="date">
                        <el-form-item label="開始時間：">
                            <el-date-picker
                            :picker-options="pickerOptions1"
                            v-model="ruleForm.beginDate"
                            type="date"
                            placeholder="选择日期">
                            <i class=""></i>
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="結束時間：" >
                            <el-date-picker
                            :picker-options="pickerOptions2"
                            v-model="ruleForm.overDate"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item id="lastBtn">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="warning" @click="submitForm('ruleForm')">確定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 新建框 -->
    </div>
</template>

<script>
import newBuild from "../../components/newBuild" 
export default {
    name:'discountSite',
    components:{
        newBuild
    },
    data(){
        return{
            isBegin:false,  //活動未開始
            isBegining:false,    //活動進行中...
            isOver:false,     //活動已結束
            pickerOptions1: {
                disabledDate: (time) => {
                    if (this.ruleForm.overDate != "") {
                        return time.getTime() < Date.now() - 8.64e7 || time.getTime() < this.ruleForm.overDate;
                    } else {
                        return time.getTime() < Date.now() - 8.64e7;
                    }

                }
            },
            pickerOptions2: {
                disabledDate: (time) => {
                    return time.getTime() < this.ruleForm.beginDate || time.getTime() < Date.now() - 8.64e7;
                }
            },
            isShow:false,
            show:true,
            dialogVisible:false,                //彈出框
            title:"打折券設置",                   //表頭文字
            lists:[],
            ruleForm:{
                name:'',
                need:"",
                number:'',
                full:"",
                cut:"",
                contentType:"5",
                beginDate:"",
                overDate:""
            },
            rules:{
                name:[
                    { required: true, message: '请输入代金券名稱', trigger: 'blur' },
                ],
                need:[
                    {required:true,message:"請輸入所需積分",trigger:"blur"},
                ],
                number:[
                    {required:true,message:"請輸入您想要發行的數量",trigger:"blur"},
                ],
                cut:[
                    {required:true,message:"請輸入需達到滿減的金額",trigger:"blur"},
                ]
            },
            beginDate:'',
            overDate:'',
            currentPage: 1,
            pageSize:10,
            total:null
        }
    },
    mounted(){
        this.getLists(this.currentPage)
    },
    methods:{
        // 獲取所有優惠列表
        getLists(currentPage){
            var myDate = new Date()
            this.$get("coupon/getAvailableSysCoupons",{
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                adminFlag:1
            }).then(res =>{
                if(res.code === 0){
                    this.lists = [];
                    this.total = res.data.total;
                    this.lists = res.data.list;
                    for(let i = 0;i<this.lists.length;i++){
                        this.lists[i].beginTime = this.$getTimes(this.lists[i].beginTime);
                        this.lists[i].stopTime = this.$getTimes(this.lists[i].stopTime);

                    // 把今天的時間分別與活動開始時間、結束時間做比較，從而判斷該活動的進行狀態

                        if(this.$getTimes(myDate)< this.$getTimes(this.lists[i].beginTime)){
                            this.$set(this.lists[i],'isBegin',true)
                        }else if(this.$getTimes(myDate)>this.$getTimes(this.lists[i].stopTime)) {
                            this.$set(this.lists[i],'isOver',true)
                        }else{
                             this.$set(this.lists[i],'isBegining',true)
                        }
                    }
                }
            })
        },
        // 新建
        add(){
            this.dialogVisible = true
        },
        //確定新建
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post("coupon/add",[{
                        amount: this.ruleForm.number,
                        beginTime:this.$getTimes(this.ruleForm.beginDate),
                        stopTime: this.$getTimes(this.ruleForm.overDate),
                        conditionAmount: this.ruleForm.full,
                        discount:this.ruleForm.cut,
                        couponType: this.ruleForm.contentType,
                        couponName:this.ruleForm.name,
                        needIntegral:this.ruleForm.need
                    }]).then(res =>{
                        if(res.code === 0){
                            this.$message({
                                message:"添加成功",
                                type:"success"
                            })
                            this.ruleForm.name = "";
                            this.ruleForm.number = "";
                            this.ruleForm.need = "";
                            this.ruleForm.beginDate = "";
                            this.ruleForm.overDate = "";
                            this.ruleForm.full = "";
                            this.ruleForm.cut = "";
                            this.getLists();
                            this.dialogVisible = false
                        }
                    })
                } else {
                    alert(valid)
                    this.$message.error("請確認所填寫的數據")
                    return false;
                }
            });
        },
        handleChange(){
            this.isShow = false;
        },
        handleCut(){
            this.isShow = true;
        },
        // 刪除
        delet(val,index){
            console.log(val,val.id)
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$get("coupon/deleteOneSysCoupon",{
                    couponId:val.id
                }).then(res=>{
                    if(res.code === 0){
                        this.lists.splice(index,1)
                         this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getLists()
                    }
                })
           
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.getLists(this.currentPage)
        }
    },
 
}
</script>
<style>
    .voucher .el-date-editor.el-input{
        width:unset;
    }
    #preferential .el-form-item__content{
        margin-left: unset !important;
    }
    .el-radio-button:first-child .el-radio-button__inner{
        border-radius: 4px;
    }
    .el-radio-button:last-child .el-radio-button__inner{
        border-left: 1px solid #dcdfe6;
        border-radius: 4px;
    }
    .el-radio-button__inner{
        width: 100%;
    }
</style>
<style scoped>
    /* 主体内容 */
    .content{
        width:100%;
        background-color: #fff;
    }
    .list{
        width:97%;
        height: 160px;
        margin: auto;
        padding:20px 0;
        border-bottom:1px solid #ccc;
        box-sizing: border-box;
    }
    .list .left{
        float: left;
        width:340px;
        height: 120px;
    }
    .list .money{
        display: flex;
        justify-content: space-between;
    }
    .list li:last-child{
        font-size: 14px;
        color: #333;
        margin-top: 30px;
    }
    .list li:first-child h1{
        width:150px;
        font-size: 16px;
        color: #333;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .item {
      margin: 4px;
    }
    .list li:first-child span{
        font-size: 12px;
        color: #f99e1b
    }
    .list li:nth-child(2),.list li:nth-child(3){
        font-size: 12px
    }
    .el-radio-group{
        margin-bottom: 30px;
    }
    #preferential{
        width:97%;
        margin:auto;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
     /* 满减---满 */
    #full{
        position: absolute;
        top:5px;
        left:-50px;
        z-index: 100;
    }
    em{
        color:red;
        margin-right: 3px;
    }
    .el-radio-button{
        width:180px ;
    }
    .el-button--danger{
       float: right;
       margin-top: 40px ;
    }
    #lastBtn{
        width:100%;
        height: 60px;
        display: flex;
        justify-content: space-around;
        margin-top: 55px;
        margin-left: -50px;
    }
    #lastBtn .el-button{
        width:250px;
    }
    .voucher .price,.voucher .date{
        display: flex;
        justify-content: space-between;
    }
    .voucher .el-form-item{
        width:45%;
    }
    .block{
        width: 100%;
        height: 50px;
        background-color: #fff;
    }
    .el-pagination{
        float: right;
        margin-right: 20px;
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
