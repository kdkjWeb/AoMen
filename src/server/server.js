import Axios from './index'
import Vue from 'vue'
import { Message, Loading } from 'element-ui';

/***
 * 公用的server方法
 */

 export default{
      //get请求
      get:(url,data,load)=>{
        let loading;
        if(load || load == undefined) {
            loading = Loading.service({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)'
            });
          }
        return new Promise((resolve,reject)=>{
            Axios.get(url,{
                params: data
            }).then((res)=>{  
                   //如果动画为true，返回之后需要关闭动画
                if(load || load == undefined) {
                    loading.close();
                }

                if(res.data.code == 0){
                    resolve(res.data)
                }else if(res.data.code == 500){
                    resolve(res.data)
                }
            },err=>{
                   //如果动画为true，返回之后需要关闭动画
                if(load || load == undefined) {
                    loading.close();
                }

                if(err.data.msg){
                    Message({
                        message: err.msg,
                        type: 'warning'
                      });
                }else{
                    Message({
                        message: '系统异常',
                        type: 'warning'
                      });
                }

            }).catch((err)=>{
                   //如果动画为true，返回之后需要关闭动画
                if(load || load == undefined) {
                    loading.close();
                }
               
                reject(err)
            })
        })
    },


      //post请求
      post: (url,data,load)=>{
        let loading;
        if(load || load == undefined) {
            loading = Loading.service({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)'
            });
          }

        return new Promise((resolve,reject)=>{
            Axios.post(url,data)
            .then((res)=>{

                  //如果动画为true，返回之后需要关闭动画
                if(load || load == undefined) {
                    loading.close();
                }
                if(res.data.code == 0){
                    resolve(res.data)
                }else if(res.data.code == 500){
                    resolve(res.data);
                }
            },err=>{
                  //如果动画为true，返回之后需要关闭动画
                if(load || load == undefined) {
                    loading.close();
                }

                if(err.msg){
                    Message({
                        message: err.data.msg,
                        type: 'warning'
                      });
                }else{
                    Message({
                        message: '系统异常',
                        type: 'warning'
                      });
                }

            }).catch((err)=>{
                   //如果动画为true，返回之后需要关闭动画
                if(load || load == undefined) {
                    loading.close();
                }
                reject(err)
            })
        })
    },

    //put請求
    put:(url,data,load)=>{
        let loading;
        if(load || load == undefined) {
            loading = Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
        }
        return new Promise((resolve,reject) => {
            Axios.put(url,data)
                .then(res => {
                //如果动画为true，返回之后需要关闭动画
                if(load || load == undefined) {
                    loading.close();
                }
                if(res.data.code == 0){
                    resolve(res.data)
                }else if(res.data.code == 500){
                    resolve(res.data);
                }
                },err => {
                    //如果动画为true，返回之后需要关闭动画
                    if(load || load == undefined) {
                        loading.close();
                    }

                    if(err.msg){
                        Message({
                            message: err.data.msg,
                            type: 'warning'
                        });
                    }else{
                        Message({
                            message: '系统异常',
                            type: 'warning'
                        });
                    }
                }).catch((err)=>{
                    if(load || load == undefined) {
                        loading.close();
                    }
                    reject(err)
                })
          })
    },
    //delete請求
    delete:(url,data,load)=>{
        let loading;
        if(load || load == undefined) {
            loading = Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
        }
        return new Promise((resolve,reject) => {
            Axios.delete(url,data,{
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
                .then(res => {
                //如果动画为true，返回之后需要关闭动画
                if(load || load == undefined) {
                    loading.close();
                }
                if(res.data.code == 0){
                    resolve(res.data)
                }else if(res.data.code == 500){
                    resolve(res.data);
                }
                },err => {
                    //如果动画为true，返回之后需要关闭动画
                    if(load || load == undefined) {
                        loading.close();
                    }

                    if(err.msg){
                        Message({
                            message: err.data.msg,
                            type: 'warning'
                        });
                    }else{
                        Message({
                            message: '系统异常',
                            type: 'warning'
                        });
                    }
                }).catch((err)=>{
                    if(load || load == undefined) {
                        loading.close();
                    }
                    reject(err)
                })
          })
    },
    // 时间戳转换
    getTimes:(times)=>{
        var d = new Date(times);
        if(d.getMonth()+1<10){
          if(d.getDate()<10){
            return d.getFullYear()+"-"+"0"+(d.getMonth()+1)+"-"+"0"+d.getDate();
          }else{
            return d.getFullYear()+"-"+"0"+(d.getMonth()+1)+"-"+d.getDate();
          }
        }
          if(d.getMonth()+1 == 10){
            if(d.getDate()<10){
              return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+"0"+d.getDate();
            }else{
              return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
            }
          }
          if(d.getMonth()+1 > 10){
            if(d.getDate()<10){
              return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+"0"+d.getDate();
            }else{
              return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
            }
        }
    },
    getTime:(times)=>{
        var str = times;
        str = str.replace('-','/');
        var date = new Date(str);
        var time = date.getTime();
        return time;
    }
 }