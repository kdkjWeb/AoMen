<template>
    <div id="homePage">
        <el-container>
            <el-header>
                <h1>澳門到家</h1>
                <ul>
                    <li class="admin" style="margin-right:30px">
                        <img src="../../assets/images/header.jpg" alt="">
                        <span>黄大喵</span>
                        <div></div>
                    </li>
                    <li class="myicon">
                        <i class="el-icon-minus"></i>
                        <i class="el-icon-close"></i>
                    </li>
                </ul>
            </el-header>
            <el-container id="aside">
                <el-aside class="aside">
                    <el-row>
                        <el-col :span="24">
                            <el-menu
                            :router="true"
                            unique-opened
                            default-active="2"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
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
                                        <el-menu-item index="turnOverOrder">已成交訂單</el-menu-item>
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

        }
    },
    methods:{
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style scoped>
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
/* 菜单头部 */
    #homePage .el-header{
        width:100%;
        height: 90px !important;
        display: flex;
        justify-content: space-between;
        background-color: #2b3245;
    }
    #homePage .el-header h1{
        line-height: 90px;
        font-size: 22px;
        color:#fff;
    }
    #homePage .el-header ul{
        height: 40px;
        display: flex;
        margin-top: 25px;
    }
    #homePage .el-header li{
        width:100px;
    }
    #homePage .el-header .admin,#homePage .el-header .myicon{
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
    #homePage img{
        width:40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
/* 菜单头部 */
/* 菜单侧栏 */
#homePage .el-container{
    height: 100%;
}
#aside .iconfont{
    font-size: 18px;
    color: #ccc;
    margin-right: 10px;
}
/* 菜单侧栏 */
</style>

