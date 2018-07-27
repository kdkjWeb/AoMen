<template>
    <div>
        <!-- start頂部標題新建按鈕 -->
        <newBuild @keep="keep"  :title="title"></newBuild>
        <!-- end頂部標題新建按鈕 -->
        <!-- 提現 -->
        <div class="putforward">
            <el-form :model="form"  label-width="120px" class="ruleForm">
                <el-form-item label="提現開關：" prop="name">
                    <el-switch
                    v-model="value2"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="評論贈送積分：" prop="name">
                    <el-input placeholder="请输入内容" v-model="form.score">
                        <template slot="append">分</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <!-- 提現 -->
        <!-- 用戶消費等級/折扣設置 -->
        <div class="level">
            <h1>用戶消費等級/折扣設置</h1>
            <el-form :model="formLevel"  label-width="80px" class="demo-ruleForm">
                 <el-form-item label="鐵牌用戶" prop="name">
                    <el-input placeholder="请输入内容" v-model="form.score">
                        <template slot="append">圓</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="折扣率" prop="name">
                    <el-input placeholder="请输入内容" v-model="form.score">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="銅牌用戶" prop="name">
                    <el-input placeholder="请输入内容" v-model="form.score">
                        <template slot="append">圓</template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="折扣率" prop="name">
                    <el-input placeholder="请输入内容" v-model="form.score">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="銀牌用戶" prop="name">
                    <el-input placeholder="请输入内容" v-model="form.score">
                        <template slot="append">圓</template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="折扣率" prop="name">
                    <el-input placeholder="请输入内容" v-model="form.score">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="金牌用戶" prop="name">
                    <el-input placeholder="请输入内容" v-model="form.score">
                        <template slot="append">圓</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="折扣率" prop="name">
                    <el-input placeholder="请输入内容" v-model="form.score">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <!-- 用戶消費等級/折扣設置 -->
        <!-- 提現設置 -->
        <div class="site">
            <el-form :model="form"  label-width="200px" class="demo-ruleForm">
               <el-form-item label="商家可提現時間設置：" prop="name">
                    <el-input placeholder="请输入内容" v-model="form.score">
                        <template slot="append">天以後</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商戶提現最低金額設置：" prop="name">
                    <el-input placeholder="请输入内容" v-model="form.score">
                        <template slot="append">圓</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商戶每日提現最高金額設置：" prop="name">
                    <el-input placeholder="请输入内容" v-model="form.score">
                        <template slot="append">圓</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <!-- 提現設置 -->
        <!-- 微信賬號設置 -->
        <div class="wxSite">
            <el-form :model="form"  label-width="160px" class="demo-ruleForm">
                <el-form-item label="收付款微信賬號設置">
                    <el-input v-model="form.name"></el-input>
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
            value2:true,
            form:{
                score:""
            },
            formLevel:{

            }
        }
    },
    methods:{
        keep(){
            console.log("保存")
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
