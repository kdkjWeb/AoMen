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
                <input v-model="userInfo.userPas" class="row_input" type="password" placeholder="請輸入您的密碼" @keyup.enter="login">
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
            if(this.userInfo.userName == "" || this.userInfo.userPas == ""){
                this.$message({
                    message: '請輸入用戶名或密碼',
                    type: 'warning'
                });
                return;
            }else if((/^[\u0391-\uFFE5]+$/.test(this.userInfo.userName))){
                this.$message({
                    message: '請輸入正確的用戶名',
                    type: 'warning'
                });
                return;
            }
            else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,20}$/.test(this.userInfo.userPas))){
                this.$message({
                    message: '請輸入正確的密碼,且保證長度在8-20位之間',
                    type: 'warning'
                });
            }
            else if(this.userInfo.userName.length > 12 || this.userInfo.userName.length < 8 || this.userInfo.userPas.length > 12 || this.userInfo.userPas.length < 8){
                this.$message({
                    message: '用戶名或密碼長度不夠8位或已超過20位，請輸入正確的用戶名或密碼',
                    type: 'warning'
                });
                return;
            }else{
               this.$post('login',{
                   phone: this.userInfo.userName,
                   password: this.userInfo.userPas
               }).then(res=>{
                   console.log(res)
                   if(res.code === 0){
                        let flag = res.data.roleList.includes('super_admin');
                        sessionStorage.setItem('role',flag)
                        sessionStorage.setItem("id",res.data.id)
                        localStorage.setItem("userName",JSON.stringify(this.userInfo.userName));
                        // localStorage.setItem("userPas",JSON.stringify(this.userInfo.userPas));
                        this.$router.push({
                            path:"/homePage",
                        })
                   }else{
                       this.$message.error("用戶名或密碼錯誤")
                   }
               })
            }
        },
        
    },
   mounted(){
        this.userInfo.username = JSON.parse(localStorage.getItem('userName'));
   },
  
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
    top:25%;
    /* left: 35%; */
    right: 15%;
    width: 500px;
    height:360px;
    border:2px solid #fff;
    border-radius: 8px;
    box-sizing: border-box;
    background:rgba(124, 134, 146, .5)
}
.login_wrap .title{
    padding: 25px 0;
    text-align: center;
    font-size: 24px;
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
    margin-top: 30px !important;
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
#remember{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0;
    color: white;
  }
  #remember .el-checkbox{
       color: white;
     }
  #remember .el-checkbox{
       line-height:40px;
     }
/*用户登录输入框*/


</style>
