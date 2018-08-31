import Vue from 'vue'
import Axios from 'axios'



let axiosConfig = Axios.create({
    baseURL:'http://101.207.139.80:8081/',
    timeout: '5000',
    withCredentials: true,
});


export default axiosConfig;