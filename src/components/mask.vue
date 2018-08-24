<template>
    <div>
        <div class="loading" v-show="isloading">
            <div class="gif"></div>
        </div>
    </div>
</template>

<script>
export default {
    prop:{
        isLoading:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            
        }
    }
}
</script>

<style>
.loading {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: black;
    opacity: 0.4;
    z-index: 10000;
}

.loading .gif {
    height: 32px;
    width: 32px;
    background: url('../../static/loading.gif');
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -16px;
    margin-top: -16px;
    z-index: 10001;
    background-size:100% 100%;
}
</style>
