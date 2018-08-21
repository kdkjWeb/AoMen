<template>
    <div class="searchBar">
        <h1>{{title}}</h1>
        <div class="search">
            <input type="text" v-model="inputText" :placeholder="placeholder">
            <span class="iconfont icon-search-o" @click="search"></span>
        </div>
 
        <el-select v-model="status" clearable filterable placeholder="訂單狀態查詢" class="myform" v-show="isSearch">
            <el-option label="保護期" value="1"></el-option>
            <el-option label="退款中" value="4"></el-option>
            <el-option label="已退款" value="5"></el-option>
            <el-option label="已完结" value="6"></el-option>
        </el-select>

        <div class="block" v-show="isShow" >
            <el-date-picker
            v-model="date"
            editable
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="border:none;width:300px;margin-top:5px">
            </el-date-picker>
        </div>
    </div>
</template>

<script>
export default {
   props:{
       title: {
           type: String,
           default: '这里是列表名称',
       },
       placeholder:{
           type: String,
           default: '请输入查询内容',
       },
       isShow: {
           type: Boolean,
           default: false
       },
       isSearch: {
           type: Boolean,
           default: false
       }
   },
   data(){
       return {
           inputText: '',
           date:'',
           status:"",
       }
   },
   methods:{
       search(){
           this.$emit('search',this.inputText)
       },
       blur(){
           this.$emit("date",this.date)
       },
       orderStatus(val){
           this.$emit("orderStatus",this.status)
       }
   }
}
</script>

<style>
.el-date-editor--daterange.el-input__inner{
    width:235px !important;
}
.el-input--suffix .el-input__inner{
    width:100% !important;
    height: 50px;
    border-radius: 8px;
}
</style>

<style scoped>
.searchBar{
    width: 100%;
    height: 90px;
    background-color: #fff;
    margin: 10px 0 20px;
}
.searchBar h1{
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 3px;
    border-left: 2px solid #f99e1b;
    padding-left: 10px;
    float: left;
    margin-top: 30px;
}
.search{
    position: relative;
    width: 230px;
    height: 50px;
    border: 1px solid #ddd;
    float: right;
    margin-right: 20px;
    margin-top: 20px;
    border-radius: 8px;
    overflow: hidden;
}
.search input{
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    padding-left: 15px;
    box-sizing: border-box;
}
.search span.iconfont{
    position: absolute;
    display: inline-block;
    height: 30px;
    right: 10px;
    top: 10px;
    font-size: 30px;
    color: #f99e1b;
    border-left: 1px solid #ddd;
    padding-left: 15px;
    line-height: 30px;
    cursor: pointer;
}
.block{
    float: right;
    width: 240px;
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-right: 90px;
    margin-top: 20px;
    box-sizing: border-box;
}
.myform{
    width:200px;
    float: right;
    margin-top:20px;
    margin-right: 80px;
}
</style>
