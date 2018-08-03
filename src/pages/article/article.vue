<template>
    <div>
        <!-- 新建表頭 -->
        <newBuild :title="title" :isShow="false"></newBuild>
        <!-- 新建表頭 -->
        <!-- 內容 -->
        <div class="content" v-for="(list,index) in lists" :key="index">
            <div class="list">
                <dl>
                   <dt>
                       <img :src="list.src" alt="">
                   </dt>
                   <dd>
                       <h3>{{list.name}}</h3>
                       <p>{{list.date}}</p>
                   </dd>
                   <dd><span>{{list.level}}</span></dd>
               </dl>
                <el-button type="danger" @click="delet">刪除</el-button>
            </div>
            <div class="cause">
                <h3>{{list.title}}</h3>
                <p>
                    {{list.text}}
                </p>
                <div>
                    <img :src="img.src" alt="" v-for="(img,index) in imgs" :key="index">
                </div>
            </div>
        </div>
        <!-- 內容 -->
    </div>
</template>

<script>
import newBuild from "./../../components/newBuild"
export default {
    components:{
        newBuild
    },
    data(){
        return{
            title:"貼文管理",
            imgs:[
               { src:"../../../static/header.jpg"},
               { src:"../../../static/header.jpg"},
               { src:"../../../static/header.jpg"}
            ],
            lists:[{
                src:"../../../static/header.jpg",
                name:"黃大喵",
                date:"2018-07-27",
                level:"金牌專員",
                title:"招聘信息",
                text:"jdhfjdfjfsdjfdjkshfjdshfjkdhfjsdhjfgj"
            },{
                src:"../../../static/header.jpg",
                name:"黃大喵",
                date:"2018-07-27",
                level:"金牌專員",
                title:"招聘信息",
                text:"jdhfjdfjfsdjfdjkshfjdshfjkdhfjsdhjfgj"
            }]
        }
    },
    methods:{
        delet(){
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
    .content{
        background-color: #fff;
        padding: 20px;
        margin-bottom: 20px;
        box-sizing: border-box;
    }
    .list dl{
        float: left;
        width: 200px;
    }
    .list dl img{
        width: 40px;
        height: 40px;
        border-radius: 6px;
    }
    .list dl h3{
        font-size: 14px;
        font-weight: 700;
        color: #333333
    }
    .list dl dt{
        float: left;
        margin-right: 25px;
    }
    .list dl dd{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #777777
    }
    .el-button--danger{
       float: right;
       margin-top: 20px ;
    }
    .cause{
        padding-top:60px  ;
    }
    .cause h3{
        border-left: 5px solid #eee;
        padding-left: 15px;
        margin-bottom: 30px;
    }
    .cause p{
        margin-bottom: 50px;
    }
    .cause img{
        width: 140px;
        height: 140px;
        margin-right: 10px;
    }
    </style>
