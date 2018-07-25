<template>
    <div class="login">
        <div class="login_wrap">
            <h1 class="title">澳门到家</h1>
            <div class="row">
                <span class="iconfont icon-yonghuming icon"></span>
                <input v-model="userInfo.userName" class="row_input" type="text" placeholder="请输入您的用户名">
            </div>
            <div class="row">
                <span class="iconfont icon-icon icon"></span>
                <input v-model="userInfo.userPas" class="row_input" type="password" placeholder="请输入您的密码">
            </div>
            <div class="row login_btn" @click="login">登录</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userInfo: {
                userName: '',
                userPas: '',
            },
        }
    },
    methods:{
        login(){

        }
    }
}
</script>

<style scoped>
.login{
    position: relative;
    height: 100%;
    background-image: url(../../assets/images/loginBg.png);
    background-repeat: no-repeat;
    background-size: cover;
    min-width: 1200px;
}

/*用户登录输入框*/
.login_wrap{
    position: absolute;
    top: 295px;
    right: 7.84%;
    width: 500px;
    height: 480px;
    border: 1px solid #fff;
    border-radius: 8px;
    box-sizing: border-box;
    background:rgba(124, 134, 146, .5)
}
.login_wrap .title{
    padding: 46px 0;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    letter-spacing: 3px;
}
.row{
    position: relative;
    width: 400px;
    height: 50px;
    box-sizing: border-box;
    margin: 0 auto 30px;
}
.row_input{
    width: 400px;
    height: 50px;
    padding-left: 45px;
    box-sizing: border-box;
}
.login_btn{
    margin-top: 82px !important;
    background-color: #2791fe;
    color: #fff;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
}
/*用户登录输入框*/
</style>
