import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'uri-js';



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/Login/login.vue'],resolve)
    },{
      path:"/",
      name:'homgPage',
      component: resolve => require(['@/pages/homePage/homePage.vue'],resolve),
      children:[{
        path:"/userList",
        name:'userList',
        component: resolve => require(['@/pages/userList/userList.vue'],resolve)
      },{
        path:"/userListDetails",
        name:'userListDetails',
        component: resolve => require(['@/pages/userList/userListDetails.vue'],resolve)
      },{
        path:"/bussinessList",
        name:'bussinessList',
        component: resolve => require(['@/pages/bussinessList/bussinessList.vue'],resolve)
      },{
        path:"/bussinessDetail",
        name:'bussinessDetail',
        component: resolve => require(['@/pages/bussinessList/bussinessDetail.vue'],resolve)
      },{
        path:"/applyList",
        name:'applyList',
        component: resolve => require(['@/pages/applyList/applyList.vue'],resolve)
      },{
        path:"/turnOverOrder",
        name:'turnOverOrder',
        component: resolve => require(['@/pages/turnOverOrder/turnOverOrder.vue'],resolve)
      },{
        path:"/reBackOrder",
        name:'reBackOrder',
        component: resolve => require(['@/pages/reBackOrder/reBackOrder.vue'],resolve)
      },{
        path:"/reBackOrderDetail",
        name:'reBackOrderDetail',
        component: resolve => require(['@/pages/reBackOrder/reBackOrderDetail.vue'],resolve)
      },{
        path:"/userTrade",
        name:'userTrade',
        component: resolve => require(['@/pages/userTrade/userTrade.vue'],resolve)
      },{
        path:"/bussinessCashes",
        name:'bussinessCashes',
        component: resolve => require(['@/pages/bussinessCashes/bussinessCashes.vue'],resolve)
      },{
        path:"/discountSite",
        name:'discountSite',
        component: resolve => require(['@/pages/discountSite/discountSite.vue'],resolve)
      },{
        path:"/creditSite",
        name:'creditSite',
        component: resolve => require(['@/pages/creditSite/creditSite.vue'],resolve)
      },{
        path:"/article",
        name:'article',
        component: resolve => require(['@/pages/article/article.vue'],resolve)
      },{
        path:"/platformContrl",
        name:'platformContrl',
        component: resolve => require(['@/pages/platformContrl/platformContrl.vue'],resolve)
      },{
        path:"/basicSite",
        name:'basicSite',
        component: resolve => require(['@/pages/basicSite/basicSite.vue'],resolve)
      }]
    }
  ]
})
