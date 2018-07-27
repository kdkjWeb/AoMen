<template>
    <div class="newBuild">
        <h1>{{title}}</h1>
        <div class="btn">
            <el-button type="warning" @click="newBuild" v-if="isAdd" id="new"><i class="el-icon-plus"></i> 新建</el-button>
            <el-button type="warning" @click="save" v-else id="save">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name:"newBuild",
    props:{
        title:{
            type:String,
            default:"这是列表名称"
        },
        isAdd:{
            type:Boolean,
            default:"true"
        }
    },
    data(){
        return{

        }
    },
    methods:{
        newBuild(){
            console.log("新建")
        //    this.$emit('search',this.inputText)
       },
       save(){
           console.log("保存")
        //    this.$emit("date",this.date)
       }
    }
}
</script>

<style scoped>
.newBuild{
    width: 100%;
    height: 90px;
    background-color: #fff;
    margin: 10px 0 20px;
}
.newBuild h1{
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 3px;
    border-left: 2px solid #f99e1b;
    padding-left: 10px;
    float: left;
    margin-top: 30px;
}
.btn{
    width:100px;
    float: right;
}
#new,#save{
    margin-top: 25px;
    border-radius: 25px;
}
</style>
