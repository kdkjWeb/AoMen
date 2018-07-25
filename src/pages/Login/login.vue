<template>
    <div class="login">
        <div class="login_wrap">
           
            <!-- <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="name">
                    <i class="iconfont icon-yonghu"></i>
                    <el-input type="username" v-model="ruleForm2.name" auto-complete="off" placeholder="请输入账号"> </el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <i class="iconfont icon-mima"></i>
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登録</el-button>
                </el-form-item>
            </el-form> -->
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            ruleForm2: {
                name: '',
                pass: '',
            },
        }
    },
    methods:{

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
    background-color: rgba(0, 0, 0, .5);
}
/*用户登录输入框*/


</style>
