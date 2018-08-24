<template>
    <div id="homePage">
        <el-container>
            <el-header>
                <div class="logo">
                    <img src="../../../static/logo.png" alt="">
                    <h1>澳門到家</h1>
                </div>
                <ul style="width:300px">
                    <li class="admin" style="margin-right:30px">
                        <div class="headerName" @click="handleClick">
                            <img src="../../assets/images/header.jpg" alt="">
                            <span>{{userName}}</span>
                        </div>
                       
                    </li>
                    <li class="myicon">
                        <i class="el-icon-minus"></i>
                        <i class="el-icon-close" @click="loginOut"></i>
                    </li>
                </ul>
                <!-- 修改密碼彈出框 -->
                <el-dialog :visible.sync="dialogFormVisible" width="30%">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="原密碼：" prop="oldPass">
                            <el-input v-model="ruleForm.oldPass"></el-input>
                        </el-form-item>
                        <el-form-item label="新密碼：" prop="newPass">
                            <el-input v-model="ruleForm.newPass"></el-input>
                        </el-form-item>
                        <el-form-item label="確認密碼：" prop="confirm">
                            <el-input v-model="ruleForm.confirm"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitPass('ruleForm')">確 認</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <!-- 修改密碼彈出框 -->
            </el-header>
            <!-- 修改密码及新建人员弹框 -->
            <div v-show="isShow" class="super">
                <div class="loading" @click="close"></div>
                <ul class="adminSpecial">
                    <li @click="update" >修改密碼</li>
                    <li @click="newPerson" v-show="show" >新建人員</li>
                </ul>
            </div>
            <!-- 修改密码及新建人员弹框 -->
            <el-container id="aside">
                <el-aside class="aside">
                    <el-row>
                        <el-col :span="24">
                            <el-menu
                            :router="true"
                            unique-opened
                            @select="handleSelect"
                            default-active="2"
                            class="el-menu-vertical-demo"
                            background-color="#2b3245"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                                <el-submenu index="1">
                                    <template slot="title">
                                        <i class="iconfont icon-yonghu"></i>
                                        <span>用戶管理</span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="userList">用戶列表</el-menu-item>
                                        <el-menu-item index="bussinessList">商家列表</el-menu-item>
                                        <el-menu-item index="applyList">申請列表</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-submenu index="2">
                                    <template slot="title">
                                        <i class="iconfont icon-icondd2"></i>
                                        <span>訂單管理</span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="turnOverOrder">付款訂單</el-menu-item>
                                        <el-menu-item index="reBackOrder">退款訂單</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-submenu index="3">
                                    <template slot="title">
                                        <i class="iconfont icon-navicon-jylstj"></i>
                                        <span>流水管理</span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="userTrade">用戶交易</el-menu-item>
                                        <el-menu-item index="bussinessCashes">商家提現</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                                 <el-submenu index="4">
                                    <template slot="title">
                                        <i class="iconfont icon-huodong1"></i>
                                        <span>活動管理</span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="discountSite">打折券設置</el-menu-item>
                                        <el-menu-item index="creditSite">積分兌換設置</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-submenu index="5">
                                    <template slot="title">
                                        <i class="iconfont icon-wenben101"></i>
                                        <span>貼文管理</span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="article">貼文管理</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-submenu index="6">
                                    <template slot="title">
                                        <i class="iconfont icon-lunboxiaoguo"></i>
                                        <span>轮播图管理</span>
                                    </template>
                                     <el-menu-item-group>
                                        <el-menu-item index="Carousel">轮播图管理</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-submenu index="7" v-show="show">
                                    <template slot="title">
                                        <i class="iconfont icon-macbook-o"></i>
                                        <span>平臺配置</span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="platformContrl">平臺控制</el-menu-item>
                                        <el-menu-item index="basicSite">基本設置</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
         
    </div>
</template>
<script>
export default {
    name:"homePage",
    data(){
        return{
            userName:"",     //登錄者賬號
            isShow:false,       //修改密码及新建人员弹框是否顯示
            show: false,        //是否為超級管理員時顯示與否
            dialogFormVisible:false,    //修改密碼彈出框
            ruleForm: {                 // 修改密碼表單                         
                oldPass: '',            //原密碼
                newPass: '',            //新密碼
                confirm: '',            //確認密碼
            },
            rules:{                     //表單驗證規則
                oldPass:[
                    {required: true, message: '请输入原密碼', trigger: 'blur' },
                    // { pattern: /^[^\u4e00-\u9fa5]+$/, message: '無效的帐號', trigger: 'blur' },
                ],
                newPass:[
                    {required: true, message: '请输入新密碼', trigger: 'blur' },
                    { pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,20}$/, message: '密碼应包含数字、字母或下劃線，且長度在8-20位之間', trigger: 'blur' },

                ],
                confirm:[
                    {required: true, message: '请確認新密碼', trigger: 'blur' },
                    { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,20}$/, message: '密碼应包含数字、字母或下劃線，且長度在8-20位之間', trigger: 'blur' },

                ]
            },
        }
    },
    mounted(){
        this.show = sessionStorage.getItem('role') == 'true' ? true : false;
        this.userName = JSON.parse(localStorage.getItem("userName"))
    },
    methods:{
        // 重定向
        handleSelect(index) {},
        //點擊頭像或名字處顯示
        handleClick(){
            this.isShow = true;
        },
        // 修改密碼
        update(){
            this.dialogFormVisible  = true;
            this.isShow = false;
        },
        // 確認修改密碼
        submitPass(formName){
            if(this.ruleForm.oldPass === this.ruleForm.newPass){
                this.$message.error("旧密码和新密码必须不一致")
            }else if(this.ruleForm.newPass !== this.ruleForm.confirm){
                this.$message.error("確認密码與新密碼不一致")
            }else{
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$put("admin/modifyPassword",{
                            oldPassword: this.ruleForm.oldPass,
                            newPassword: this.ruleForm.newPass,
                            rePassword: this.ruleForm.confirm
                        }).then(res =>{
                            if(res.code === 0){
                                setTimeout(()=>{
                                    this.$message({
                                        message:"修改成功，請重新登錄",
                                        type:"success"
                                    })
                                    this.dialogFormVisible = false;
                                    this.$router.push({
                                        path:'/'
                                    })
                                },1000)
                            }else{
                                this.$message.error("修改失敗，請檢查數據")
                            }
                        })
                    } else {
                        this.$message.error("請確認所填寫的數據")
                        return false;
                    }
                });
            }
        },
        // 新建人員
        newPerson(){
            this.$router.push({
                path:"/build"
            }),
            this.isShow = false
        },
        // 註銷
        loginOut(){
            this.$confirm('是否註銷?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$get("logout",{}).then(res =>{
                    if(res.code === 0){
                        sessionStorage.removeItem('id');
                        this.$router.push({
                            path:"/"
                        })
                    }else{
                        this.$message.error("無法註銷")
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '註銷已取消'
                });          
            });
        },
        // 点击任意处修改密码及新建人员弹框消失
        close(){
            this.isShow = false
        }
    }
}
</script>
<style scoped>
/* 管理系統首頁框架 */
#homePage{
    height: 100%;
}
.el-aside{
    width:280px !important;
    background-color: #2b3245;
}
.el-menu{
    border: none
}
.el-main{
    background-color: #ddd;
}
/* 管理系統首頁框架 */
/* 菜单头部 */
#homePage .el-header{
    width:100%;
    height: 90px !important;
    display: flex;
    justify-content: space-between;
    background-color: #2b3245;
}
#homePage .logo{
    width:200px;
    display: flex;
    justify-content: space-between;
}
#homePage .logo img{
    margin: 25px 0 0 30px;
    border-radius: unset;
}
#homePage .el-header h1{
    line-height: 90px;
    font-size: 22px;
    color:#fff;
}
#homePage .el-header ul{
    height: 40px;
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
}
#homePage .el-header li{
    width:100px;
}
#homePage .el-header .headerName,#homePage .el-header .myicon{
    display: flex;
    justify-content: space-around;
}
#homePage .el-header span{
    line-height: 40px;
    font-size: 14px;
    color: #fff;
}
#homePage .el-icon-minus,#homePage .el-icon-close{
    font-size: 20px;
    margin-top: 10px;
    color: #fff;
}
#homePage .el-icon-close:hover{
    cursor:pointer;
}
#homePage img{
    width:40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}
#homePage .headerName{
    width:180px;
    position: relative;
}
#homePage .headerName:hover{
    cursor:pointer;
}
/* 菜单头部 */
/* 修改密码及新建人员弹框樣式 */
.loading {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,.1);
    z-index: 10000;
}
.adminSpecial {
    position: absolute;
    left: 85%;
    top: 9.2%;
    margin-left: -16px;
    z-index: 10001;
    background-size:100% 100%;
}
#homePage .adminSpecial{
    width:160px;
    display:flex;
    flex-direction: column;
}
#homePage .adminSpecial li{
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    color: #000;
    text-align: center;
    background-color:#fff;
}
#homePage .adminSpecial li:hover{
    background-color: #f99e1b;
    color: #fff;
    cursor:pointer;
}
.loading:hover{
    cursor:pointer;
}
#homePage .el-button--primary{
    width:90%;
    background-color: #f99e1b;
    border-color:#f99e1b;
}
/* 修改密码及新建人员弹框樣式 */
/* 菜单侧栏 */
#homePage .el-container{
    height: 100%;
}
#aside .iconfont{
    font-size: 18px;
    color: #ccc;
    margin-right: 10px;
}
#aside .iconfont:hover{
    color: #f99e1b
}
/* 菜单侧栏 */
</style>

