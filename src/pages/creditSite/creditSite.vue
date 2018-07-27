<template>
    <div>
        <!-- start頂部標題新建按鈕 -->
         <newBuild @newBulid="newBuild" :isAdd="true" :title="title"></newBuild>
        <!-- end頂部標題新建按鈕 -->

       <!-- start积分兑换列表 -->
       <div class="integral">
           <div class="integral_list" v-for="(item,index) in integralList" :key="index">
               <dl>
                   <dt>
                       <img :src="item.imgSrc" alt="">
                   </dt>
                   <dd class="title">{{item.title}}</dd>
                   <dd>剩餘數量：<span>{{item.num}}</span></dd>
               </dl>
               <div class="btn">
                    <el-button type="primary" @click="examine">查看</el-button>
                    <el-button type="danger" @click="deleted(item)">刪除</el-button>
               </div>
           </div>
       </div>
       <!-- end积分兑换列表 -->
    </div>
</template>

<script>
import newBuild from "../../components/newBuild"
export default {
    name:"creditSite",
    components:{
        newBuild
    },
    data(){
        return{
            title:"積分兌換設置",
            integralList: [
                {
                    imgSrc: '../../../static/header.jpg',
                    title: '僅需2萬積分兌換蘋果筆記本超級划算僅需2萬積分兌換蘋果筆記本超級划算',
                    num: '100'
                },{
                    imgSrc: '../../../static/header.jpg',
                    title: '僅需2萬積分兌換蘋果筆記本超級划算',
                    num: '50'
                }
            ]
        }
    },
    methods: {
        //新建
        newBuild(){
            console.log('新建')
        },
        //查看
        examine(){

        },
        //刪除
        deleted(val){
            console.log(val)
             this.$confirm('此操作將永久刪除該積分兌換活動, 是否繼續?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '刪除成功!'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消刪除'
                });          
                });
        }
    }
}
</script>

<style scoped>
.integral_list{
    width: 100%;
    height: 160px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 20px;
}
.integral_list dl{
    float: left;
    width: 400px;
}
.integral_list dl img{
    width: 120px;
    height: 120px;
    border-radius: 6px;
}
.integral_list dl dt{
    float: left;
    margin-right: 25px;
}
.integral_list dl dd.title{
    font-weight: bold;
    padding-bottom: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.integral_list div.btn{
    float: right;
    line-height: 120px;
}
</style>
