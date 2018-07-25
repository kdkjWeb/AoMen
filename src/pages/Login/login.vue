<template>
    <div class="login">
        <div class="login_wrap"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
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
}
/*用户登录输入框*/
</style>
