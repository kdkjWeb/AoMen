<template>
    <div>
        <!-- start頂部標題新建按鈕 -->
        <newBuild @keep="keep"  :title="title"></newBuild>
        <!-- end頂部標題新建按鈕 -->
        <!-- 提現 -->
        <div class="putforward">
            <el-form :model="form"  label-width="120px" class="ruleForm">
                <el-form-item label="提現開關：" prop="withdrawOnOff">
                        <el-switch
                            v-model="form.withdrawOnOff"
                            :active-value="0"
                            :inactive-value="1"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                </el-form-item>
                <el-form-item label="評論贈送積分：" prop="score">
                    <el-input placeholder="请输入内容" v-model="form.integralSend">
                        <template slot="append">分</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <!-- 提現 -->
        <!-- 用戶消費等級/折扣設置 -->
        <div class="level">
            <h1>用戶消費等級/折扣設置</h1>
            <el-form :model="form"  label-width="120px" class="demo-ruleForm">
                <!-- <el-form-item label="水晶用戶：">
                    <el-input placeholder="例：滿500">
                        <template slot="append">MOP$</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="赠送：">
                    <el-input placeholder="例：贈送100">
                        <template slot="append">MOP$代金券</template>
                    </el-input>
                </el-form-item> -->
                <el-form-item label="鐵牌用戶：">
                    <el-input placeholder="请输入内容" v-model="form.ironUser">
                        <template slot="append">MOP$</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="折扣率：">
                    <el-input placeholder="请输入内容" v-model="form.ironRate">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="銅牌用戶：">
                    <el-input placeholder="请输入内容" v-model="form.copperUser">
                        <template slot="append">MOP$</template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="折扣率：">
                    <el-input placeholder="请输入内容" v-model="form.copperRate">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="銀牌用戶：">
                    <el-input placeholder="请输入内容" v-model="form.silverUser">
                        <template slot="append">MOP$</template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="折扣率：">
                    <el-input placeholder="请输入内容" v-model="form.silverRate">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="金牌用戶：">
                    <el-input placeholder="请输入内容" v-model="form.goldenUser">
                        <template slot="append">MOP$</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="折扣率：">
                    <el-input placeholder="请输入内容" v-model="form.goldenRate">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <!-- 用戶消費等級/折扣設置 -->
        <!-- 提現設置 -->
        <div class="site">
            <el-form :model="form" :rules="rules" ref="form"  label-width="200px" class="demo-ruleForm">
               <el-form-item label="商家可提現時間設置：" prop="withdrawTime">
                    <el-input placeholder="请输入内容" v-model="form.withdrawTime">
                        <template slot="append">天以後</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商戶提現最低金額設置：">
                    <el-input placeholder="请输入内容" v-model="form.withdrawMin">
                        <template slot="append">MOP$</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商戶每日提現最高金額設置：">
                    <el-input placeholder="请输入内容" v-model="form.withdrawMax">
                        <template slot="append">MOP$</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <!-- 提現設置 -->
        <!-- 微信賬號設置 -->
        <div class="wxSite">
            <el-form :model="form"  label-width="200px" class="demo-ruleForm">
                <el-form-item label="收付款微信賬號設置：" prop="wxAccount">
                    <el-input v-model="form.wxAccount"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <!-- 微信賬號設置 -->

    </div>
</template>

<script>
import newBuild from "../../components/newBuild"
export default {
    name:"platformContrl",
    components:{
        newBuild
    },
    data(){
        return{
            title:"平臺控制",
            form:{},
            rules:{
                withdrawTime:[
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { pattern: /^[0-9]*$/, message: '無效的提現時間', trigger: 'blur' },
                ]
            }
        }
    },
    mounted(){
        this.getPlatMsg();
    },
    methods:{
        // 回顯數據
        getPlatMsg(){
            this.$get("admin/getSettings",{}).then(res =>{
                if(res.code === 0){
                    this.form = res.data;
                    this.form.ironRate = res.data.ironRate*100;
                    this.form.copperRate = res.data.copperRate*100;
                    this.form.silverRate = res.data.silverRate*100;
                    this.form.goldenRate = res.data.goldenRate*100;
                }else{
                    this.$message.error("沒有記錄")
                }
            })
        },
        // 保存信息
        keep(){
            this.$put("admin/updateSettings",{
                withdrawOnOff: this.form.withdrawOnOff,
                integralSend: this.form.integralSend,
                copperUser: this.form.copperUser,
                copperRate: this.form.copperRate/100,
                ironUser: this.form.ironUser,
                ironRate: this.form.ironRate/100,
                silverUser: this.form.silverUser,
                silverRate: this.form.silverRate/100,
                goldenUser: this.form.goldenUser,
                goldenRate: this.form.goldenRate/100,
                withdrawTime: this.form.withdrawTime,
                withdrawMin: this.form.withdrawMin,
                withdrawMax: this.form.withdrawMax,
                wxAccount: this.form.wxAccount
            }).then(res =>{
                if(res.code === 0){
                    this.$message({
                        message:"保存成功！",
                        type:"success"
                    })
                    this.getPlatMsg()
                }else{
                    this.$message.error("保存失敗！請檢查")
                }
            })
        }
    }
}
</script>

<style>
    .putforward .el-form-item__content{
        width: 40%
    }
</style>

<style scoped>
    .putforward,.level,.site,.wxSite{
        width:100%;
        padding:20px;
        margin-bottom:20px;
        box-sizing:border-box;
        background-color: #fff;
    }
    .level h1{
        font-size:16px;
        color: #333333;
        font-weight: 700;
        padding:40px 0 35px;
        box-sizing:border-box;
    }
    .demo-ruleForm{
        display: flex;
        flex-wrap:wrap;
    }
    .demo-ruleForm .el-form-item{
        width:35%;
    }
    .site{
        display: flex;
        justify-content: space-between;
    }
    .site .el-form-item{
        width:30%;
        margin-right: 20px;
    }
</style>
