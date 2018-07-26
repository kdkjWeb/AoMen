<template>
    <div>
        <searchBar :title="title" :placeholder="placeholder" @search="search" @date="date" :isShow="isShow"></searchBar>
        
    </div>
</template>

<script>
import searchBar from "./../../components/searchBar.vue"

export default {
    name:"turnOverOrder",
    components:{
        searchBar
    },
    data(){
        return{
            isShow:true,
            title:"已成交訂單",
            placeholder:"訂單號/商品名/商家昵稱",
        }
    },
    methods:{
        date(val){
            console.log(val)
        },
        search(val){
            console.log(val)
        }
    }
}
</script>

<style>

</style>
