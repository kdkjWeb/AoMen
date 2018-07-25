<template>
    <div class="login">
        <div class="login_wrap">
            <h1 class="title">澳門到家</h1>
            <div class="row">
                <span class="iconfont icon-yonghu"></span>
                <input v-model="userInfo.userName" class="row_input" type="text" placeholder="請輸入您的用戶名">
            </div>
            <div class="row">
                <span class="iconfont icon-mima"></span>
                <input v-model="userInfo.userPas" class="row_input" type="password" placeholder="請輸入您的密碼">
            </div>
            <div class="row login_btn" @click="login">登錄</div>
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
            if(!this.userInfo.userName||!this.userInfo.userPas){
                this.$message({
                    message: '請輸入用戶名或密碼',
                    type: 'warning'
                    });
                return;
            }
            this.$post('',{

            }).then(res=>{
                
            })
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
    border:2px solid #fff;
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
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    position: relative;
    outline: none;
    border: none;
    border-radius: 4px;
}
.login_btn{
    margin-top: 82px !important;
    background-color: #f99e1b;
    color: #fff;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    border-radius: 4px;
    user-select: none;
}
.iconfont{
    font-size: 18px;
    position: absolute;
    top:12px;
    left: 15px;
    z-index: 100;
    color: #000;
}
/*用户登录输入框*/


</style>
