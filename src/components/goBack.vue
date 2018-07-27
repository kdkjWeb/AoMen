<template>
    <div class="searchBar">
        <el-button round @click="goBack"><i class="el-icon-arrow-left"></i>返回</el-button>
        <div class="search" v-show="isShow">
            <input type="text" v-model="inputText" :placeholder="placeholder">
            <span class="iconfont icon-search-o" @click="search"></span>
        </div>
    </div>
</template>

<script>
export default {
   props:{
       placeholder:{
           type: String,
           default: '请输入查询内容',
       },
       isShow:{
           type: Boolean,
           default:false
       }
   },
   data(){
       return {
           inputText: ''
       }
   },
   methods:{
    //    返回
       goBack(){
           this.$router.go(-1)
       },
    //    查詢
       search(){
           this.$emit('search',this.inputText)
       }
   }
}
</script>

<style scoped>
.searchBar{
    width: 100%;
    height: 90px;
    background-color: #fff;
    margin: 10px 0 20px;
}
.searchBar .el-button.is-round{
    width:80px;
    margin: 30px 0 0 20px;
    padding-left: 15px;
}
.search{
    position: relative;
    width: 300px;
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
</style>
