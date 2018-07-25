// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


Vue.config.productionTip = false

//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import '@/assets/css/reset.css'    //重置样式公共文件

//引用阿里图标
import '@/assets/font/iconfont.css' 



//封装axios
import Server from './server/server.js';
Vue.prototype.$get = Server.get;
Vue.prototype.$post = Server.post;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
