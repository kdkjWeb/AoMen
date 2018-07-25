import Vue from 'vue'
import Axios from 'axios'



let axiosConfig = Axios.create({
    baseURL: 'http://192.168.20.158:8080/',
    timeout: '50000',
    withCredentials: true
});



export default axiosConfig;