<template>
    <div class="searchBar">
        <h1>{{title}}</h1>
        <div class="search">
            <input type="text" v-model="inputText" :placeholder="placeholder">
            <span class="iconfont icon-search-o" @click="search"></span>
        </div>
        <div class="block" v-show="isShow" >
            <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="border:none;width:300px;margin-top:5px"
            @blur="blur">
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
       }
   },
   data(){
       return {
           inputText: '',
           date:'',
       }
   },
   methods:{
       search(){
           this.$emit('search',this.inputText)
       },
       blur(){
           this.$emit("date",this.date)
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
.searchBar h1{
    /* line-height: 90px; */
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
.block{
    float: right;
    width: 310px;
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-right: 90px;
    margin-top: 20px;
    box-sizing: border-box;
}





/* .block{
    margin-top: 20px;
}
 .el-date-editor--daterange.el-input__inner{
     width:unset
 }
 .el-range-editor.el-input__inner{
     height: 50px;
 }
 .el-date-editor .el-range-separator{
     display: inline-block;
     line-height: unset !important
 } */
</style>
