<template>
    <div>
        <!-- 新建表頭 -->
        <newBuild @add="add" :isAdd="true" :title="title"></newBuild>
        <!-- 新建表頭 -->
        <!-- 列表 -->
        <div class="list" v-for="(list,index) in lists" :key="index">
            <div class="left">
                <img :src="list.src" alt="">
                <ul>
                    <li class="money">
                        <h1>{{list.title}}</h1>
                        <span>{{list.state}}</span>
                    </li>
                    <li>{{list.active}}</li>
                    <li>剩餘數量：{{list.number}}</li>
                    <li>{{list.activeTime}}</li>
                </ul>
            </div>
            <el-button type="danger" @click="delet">刪除</el-button>
        </div>
        <!-- 列表 -->
        <!-- 新建框 -->
        <el-dialog
            :visible.sync="dialogVisible"
            width="40%">
            <el-form  label-width="100px" :model="formLabelAlign">
                <div style="border-bottom:1px solid #ccc;margin-bottom:30px">
                    <el-form-item label="名稱">
                        <el-input v-model="formLabelAlign.name" placeholder="请输入代金券名稱"></el-input>
                    </el-form-item>
                    <el-form-item label="需要積分">
                        <el-input v-model="formLabelAlign.need" placeholder="请输入需要的積分"></el-input>
                    </el-form-item>
                    <el-form-item label="發行數量">
                        <el-input placeholder="请输入您想要發行的數量" v-model="formLabelAlign.number">
                            <template slot="append">張</template>
                        </el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" plain @click="direct">直接代金券</el-button>
                    <el-button type="primary" plain @click="fullCut">滿減代金券</el-button>
                </el-form-item>
                <div class="voucher">
                    <div class="price">
                        <el-form-item label="滿：">
                            <el-input placeholder="例：10" v-model="formLabelAlign.full">
                                <template slot="append">圓</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="減：" v-show="isShow">
                            <el-input placeholder="例：5" v-model="formLabelAlign.cut">
                                <template slot="append">圓</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="date">
                        <el-form-item label="開始時間：">
                            <el-date-picker
                            v-model="beginDate"
                            type="date"
                            placeholder="选择日期">
                            <i class=""></i>
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="結束時間：">
                            <el-date-picker
                            v-model="overDate"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item id="lastBtn">
                        <el-button @click="cancle">取消</el-button>
                        <el-button type="warning" @click="Determine">確定</el-button>
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
            isShow:false,
            dialogVisible:false,                //彈出框
            title:"打折券設置",                   //表頭文字
            lists:[                                             //列表內容
                {                                
                    src:"../../../static/header.jpg",
                    title:"代金券",
                    state:"進行中",
                    active:"滿50送5圓代金券",
                    number:"77",
                    activeTime:"2018-02-25至2018-03-25"
                },{
                    src:"../../../static/header.jpg",
                    title:"代金券",
                    state:"進行中",
                    active:"滿50送5圓代金券",
                    number:"77",
                    activeTime:"2018-02-25至2018-03-25"
                }
            ],
            formLabelAlign:{
                name:'',
                need:"",
                number:'',
                full:"",
                cut:""
            },
            beginDate:'',
            overDate:''
        }
    },
    methods:{
        // 新建
        add(){
            this.dialogVisible = true
        },
        // 刪除
        delet(){
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        direct(){
            this.isShow = false  
        },
        fullCut(){
            this.isShow = true
        },
        Determine(){
              this.$confirm('是否保存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        this.dialogVisible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
        },
        cancle(){
            this.$confirm('是否取消?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已取消!'
          });
        })
        }
    }
}
</script>
<style>
    .voucher .el-date-editor.el-input{
        width:unset;
    }
</style>

<style scoped>
    .list{
        width:100%;
        height: 160px;
        background-color: #fff;
        margin-bottom: 20px;
        padding:20px;
        box-sizing: border-box;
    }
    .list img{
        float: left;
        width: 120px;
        height: 120px;
        margin-right: 30px;
        border-radius: 6px;
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
        font-size: 16px;
        color: #333;
        font-weight: 700;
    }
    .list li:first-child span{
        font-size: 12px;
        color: #f99e1b
    }
    .list li:nth-child(2),.list li:nth-child(3){
        font-size: 12px
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
        width:260px;
    
    }
    .el-button--primary.is-plain{
        width:180px;
        margin-left:70px;
    }
    .voucher .price,.voucher .date{
        display: flex;
        justify-content: space-between;
    }
    .voucher .el-form-item{
        width:45%;
    }
</style>
