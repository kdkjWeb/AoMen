<template>
    <div>
        <!-- 新建表頭 -->
        <newBuild :title="title" :isShow="false"></newBuild>
        <!-- 新建表頭 -->
        <!-- 內容 -->
        <div class="content" >
            <div class="c-list" v-for="(list,index) in lists" :key="index">
                <div class="list">
                    <dl>
                        <dt>
                            <img :src="list.userMsg.files.compress" alt="" v-if="list.userMsg.files">
                        </dt>
                        <dd>
                            <h3>{{list.userMsg.nickname}}</h3>
                            <p>{{list.createTime}}</p>
                        </dd>
                        <dd><span>{{list.userMsg.level}}</span></dd>
                    </dl>
                    <el-button type="danger" @click="delet(list)">刪除</el-button>
                </div>
                <div class="cause">
                    <h3>{{list.title}}</h3>
                    <p>
                        {{list.content}}
                    </p>
                    <img :src="list.files.origin" v-if="list.files">
                </div>
            </div>
            <div class="block">
                <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total" 
                style="margin-top:10px">
                </el-pagination>
            </div>
        </div>
        <!-- 內容 -->
    </div>
</template>

<script>
import newBuild from "./../../components/newBuild"
// import axios from 'axios';
export default {
    components:{
        newBuild
    },
    data(){
        return{
            title: "貼文管理",
            lists: [],
            currentPage: 1,
            pageSize: 10,
            total: null
        }
    },
    mounted(){
        this.getAticle(this.currentPage)
    },
    methods:{
        // 獲取貼文列表
        getAticle(currentPage){
            this.$get("article/getArticleList",{
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }).then(res=>{
                if(res.code == 0){
                    this.lists = [];
                    this.total = res.data.total;
                    this.lists = res.data.list;
                    this.imgs = res.data.list
                }else{
                    this.$message.error("沒有記錄")
                }
            })
        },
        // 删除贴文
        delet(val,index){
            this. id = val.id
            this.$confirm('此操作將永久刪除該積分兌換活動, 是否繼續?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                   this.$get("article/delete",{id:val.id}).then(res =>{
                       console.log(res)
                       if(res.code === 0){
                            this.$message({
                                message:"刪除成功",
                                type:"success"
                            });
                        this.lists.splice(index,1) 
                        this.getAticle()
                       }else{
                           this.$message.error("刪除失敗")
                       }
                   })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消刪除'
                });          
            });
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.getAticle(this.currentPage)
        }
    }
}
</script>

<style scoped>
    .content{
        background-color: #fff;
        padding: 20px;
        box-sizing: border-box;
    }
    .c-list{
        margin-bottom: 30px;
        border-bottom: 1px solid #ccc;
    }
    .list dl{
        float: left;
        width: 400px;
    }
    .list dl img{
        width: 40px;
        height: 40px;
        border-radius: 6px;
    }
    .list dl h3{
        font-size: 14px;
        font-weight: 700;
        color: #333333;
    }
    .list dl p{
        margin-top: 1px;
    }
    .list dl dt{
        float: left;
        margin-right: 25px;
    }
    .list dl dd{
        width:200px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #777777;
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
        text-indent: 28px;
    }
    .cause img{
        width: 140px;
        height: 140px;
        margin-right: 10px;
        margin-bottom: 30px;
    }
    .block{
        width: 100%;
        height: 50px;
        background-color: #fff;
    }
    .el-pagination{
        float: right;
    }
    .el-pagination button, .el-pagination span:not([class*=suffix]),.el-pager li,.el-pagination__editor.el-input .el-input__inner{
        height: 40px !important;
        line-height: 40px;
        font-size: 16px;
    }
    .el-pagination .el-select .el-input .el-input__inner{
        height: 43px !important;
        font-size: 16px;
    }
</style>
