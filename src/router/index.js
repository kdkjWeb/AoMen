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
    },{
      path:"/homePage",
      name:'homePage',
      component: resolve => require(['@/pages/homePage/homePage.vue'],resolve),
      children:[{
        path:"/userList",
        name:'userList',
        component: resolve => require(['@/pages/user/userList.vue'],resolve)
      },{
        path:"/userListDetails",
        name:'userListDetails',
        component: resolve => require(['@/pages/user/userListDetails.vue'],resolve)
      },{
        path:"/bussinessList",
        name:'bussinessList',
        component: resolve => require(['@/pages/user/bussinessList.vue'],resolve)
      },{
        path:"/bussinessDetail",
        name:'bussinessDetail',
        component: resolve => require(['@/pages/user/bussinessDetail.vue'],resolve)
      },{
        path:"/applyList",
        name:'applyList',
        component: resolve => require(['@/pages/user/applyList.vue'],resolve)
      },{
        path:"/turnOverOrder",
        name:'turnOverOrder',
        component: resolve => require(['@/pages/order/turnOverOrder.vue'],resolve)
      },{
        path:"/reBackOrder",
        name:'reBackOrder',
        component: resolve => require(['@/pages/order/reBackOrder.vue'],resolve)
      },{
        path:"/reBackOrderDetail",
        name:'reBackOrderDetail',
        component: resolve => require(['@/pages/order/reBackOrderDetail.vue'],resolve)
      },{
        path:"/userTrade",
        name:'userTrade',
        component: resolve => require(['@/pages/water/userTrade.vue'],resolve)
      },{
        path:"/bussinessCashes",
        name:'bussinessCashes',
        component: resolve => require(['@/pages/water/bussinessCashes.vue'],resolve)
      },{
        path:"/discountSite",
        name:'discountSite',
        component: resolve => require(['@/pages/active/discountSite.vue'],resolve)
      },{
        path:"/creditSite",
        name:'creditSite',
        component: resolve => require(['@/pages/active/creditSite.vue'],resolve)
      },{
        path:"/creditSiteDetails",
        name:'creditSiteDetails',
        component: resolve => require(['@/pages/active/creditSiteDetails.vue'],resolve)
      },{
        path:"/article",
        name:'article',
        component: resolve => require(['@/pages/article/article.vue'],resolve)
      },{
        path:"/platformContrl",
        name:'platformContrl',
        component: resolve => require(['@/pages/desk/platformContrl.vue'],resolve)
      },{
        path:"/basicSite",
        name:'basicSite',
        component: resolve => require(['@/pages/desk/basicSite.vue'],resolve)
      },{
        path:"/build",
        name:'build',
        component: resolve => require(['@/pages/build/build.vue'],resolve)
      }]
    }
  ]
})
