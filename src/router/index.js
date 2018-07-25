import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'uri-js';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/pages/Login/login.vue'],resolve)
    }
  ]
})
