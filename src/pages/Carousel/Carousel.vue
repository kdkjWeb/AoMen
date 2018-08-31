<template>
    <div id="bussinessList">
        <div class="new">
            <el-button type="warning" @click="build">新增</el-button>
        </div>
        <!-- 新增輪播圖彈出框 -->
        <el-dialog title="新增轮播图" :visible.sync="dialogFormVisible" width="28%" center>
            <el-form :model="form">
                <el-form-item label="权重：" label-width="31%">
                    <el-select v-model="form.weight" placeholder="圖片的權重">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机型：" label-width="31%">
                    <el-select v-model="form.phoneType" placeholder="手機類型">
                        <el-option label="通用型" value="2"></el-option>
                        <!-- <el-option label="iPhoneX" value="1"></el-option> -->
                    </el-select>
                </el-form-item>
                <div class="uploadBlock">
                    <el-button style="margin-left:10%;margin-bottom:50px" @click="upLoad" type="primary" size="mini">上傳圖片</el-button>
                    <img :src="form.img" alt="">
                    <input type="file" :model="imgFile" ref="imgFileInput" v-show="false" @change="showImage">
                </div>
                <el-form-item  style="margin-left:50%;padding-top:30px">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confirm">确 定</el-button>
                </el-form-item >
            </el-form>           
        </el-dialog>
        <!-- 新增輪播圖彈出框 -->
        <!-- 表格 -->
        <div class="primary">
            <h3>通用机型轮播图</h3>
            <el-table
                :data="primary"
                style="width:98%;margin:auto;">
                <el-table-column
                prop="img"
                header-align = "center"
                label="轮播图"> 
                <template slot-scope="scope">
                    <img style="width:120px;height:80px" :src="scope.row.spic" alt="">
                </template>             
                </el-table-column>
                <el-table-column
                header-align = "center"
                v-for="(item,index) in tableList"
                :key="index"
                :prop="item.prop"
                :label="item.label">
                </el-table-column>
                <el-table-column
                header-align = "center"
                label="操作"
                width="280px">
                <template slot-scope="scope" class="handle">
                    <p style="color:red" @click="delet(scope.row)" class="delet">删除</p>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 表格 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            dialogFormVisible:false,
            primary: [],
            iphoneX: [],
            tableList:[
                {prop:"orderNum",label:"权重",width:''},
                {prop:"createTime",label:"上传时间",width:''},
            ],
            form:{
                weight:"",
                phoneType:'',
                name:"",
                img:"",
                file:""
            },
            imgFile:""
        }
    },
    mounted(){
        this.getPrimaryList();
    },
    methods:{
        // 获取通用型轮播图
        getPrimaryList(){
            this.$get("slideshow/getSlideshowList").then(res=>{
                if(res.code == 0){
                    this.primary = [];
                    this.primary = res.data
                }else{
                    this.$message.error("沒有通用型轮播图的記錄，請新增數據或重新登錄")
                }
            })
        },
        //獲取iPhoneX輪播圖
        getIphoneXList(){
            this.$get("slideshow/getIphoneXSlideshowList").then(res=>{
                if(res.code == 0){
                    this.iphoneX = [];
                    this.iphoneX = res.data
                }else{
                    this.$message.error("沒有iPhoneX輪播圖的記錄，請新增數據或重新登錄")
                }
            })
        },
        // 刪除輪播圖
        delet(val,index){
            this.$confirm('此操作將永久刪除該積分兌換活動, 是否繼續?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                   this.$get("slideshow/deleteSlideshow",{id:val.id}).then(res=>{
                        if(res.code == 0){
                            this.primary.splice(index,1)   
                            this.$message({
                                message:"已成功刪除",
                                type:"success"
                            });
                            this.getPrimaryList();
                        }else{
                            this.$message.error("刪除失敗！")
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消刪除'
                    });          
                });
        },
        // 新增
        build(){
            this.dialogFormVisible = true;
            this.form.weight = ""
            this.form.phoneType = ""
            this.form.img = ""
        },
        // 上傳圖片
        upLoad(){
            var fileInput = this.$refs.imgFileInput;
            fileInput.click()
        },
        // 顯示上傳的圖片
        showImage(){
            var fileInput = this.$refs.imgFileInput;
            var fileReader = new FileReader();
            var imgData = fileReader.readAsDataURL(fileInput.files[0]);
            this.form.name = fileInput.files[0].name;
            this.form.file = fileInput.files[0];
            var that = this;
            fileReader.onload = function(){
                that.form.img = this.result;
            }
        },
        // 確認新建輪播圖
        confirm(){
           if(this.form.weight === "" || this.form.phoneType === ""){
               this.$message.error("權重和手機類型不能為空")
           }else if(this.form.img === ""){
               this.$message.error("請上傳圖片")
           }else{
                var fromData = new FormData;
                if(this.form.phoneType == 1){
                    fromData.append("status",this.form.phoneType);
                }
                fromData.append("orderNum",this.form.weight);
                fromData.append("imgFile",this.form.file);
                this.$post("slideshow/addSlideshow",fromData).then(res=>{
                    if(res.code == 0){
                        if((this.form.phoneType == 1)){
                            this.iphoneX.push(res.data);
                            this.getIphoneXList();
                            this.dialogFormVisible = false;
                        }else{
                            this.primary.push(res.data);
                            this.getPrimaryList();
                            this.dialogFormVisible = false
                        }
                    }else{
                        this.$message.error("该權重位置已有图片，无法新增轮播图")
                    }
                })
            }
        }
    }
    
}
</script>

<style>
    #bussinessList .el-table .cell{
        display: flex;
        justify-content: space-around;
    }
</style>
<style scoped>
.delet:hover{
    cursor:pointer;
}
.new{
    width:100%;
    height: 80px;
    background-color: #fff;
}
.new .el-button{
    margin:20px;
    box-sizing:border-box;
}
.primary,.iphoneX{
    width:100%;
    height: 720px;
    background-color: #fff;
    margin-top:20px
}
.primary h3,.iphoneX h3{
    font-size:16px;
    font-weight: 700;
    padding:30px 0 20px 10px;
}
.uploadBlock img{
    width:200px;
    margin:0 20px 20px 20px;
    vertical-align:middle;
}
</style>

