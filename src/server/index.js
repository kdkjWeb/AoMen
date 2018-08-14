import Vue from 'vue'
import Axios from 'axios'



let axiosConfig = Axios.create({
    // baseURL: 'http://192.168.20.180:8081/',
    baseURL: 'http://192.168.20.50:8081/',
    timeout: '5000',
    withCredentials: true,
});


export default axiosConfig;