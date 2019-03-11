/*项目的路由分配*/ 
import Vue from 'vue'
import Router from 'vue-router'

// 使用路由
Vue.use(Router)

export default new Router({
  routes: [
    // 登陆
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login/Login.vue')
    },
    // 后端首页（容器组件）
    {
      path: '/index',
      component: () => import('./views/Index/Index.vue'),
      children:[
        // 默认进入首页为系统信息
        {
          path:'',
          name:'',
          component: () => import('./views/Systeminfo/Systeminfo.vue')
        },
        // 账号部分
        {
          path:'/index/accountadd',
          name:'accountadd',
          component: () => import('./views/Accountadd/Accountadd.vue')
        },

        {
          path:'/index/accountmanage',
          name:'accountmanage',
          component: () => import('./views/Accountmanage/Accountmanage.vue')
        },

        {
          path:'/index/passwordmodify',
          name:'passwordmodify',
          component: () => import('./views/Passwordmodify/Passwordmodify.vue')
        },
        // 商品部分
        {
          path:'/index/goodsadd',
          name:'goodsadd',
          component: () => import('./views/Goodsadd/Goodsadd.vue')
        },

        {
          path:'/index/goodsmanage',
          name:'goodsmanage',
          component: () => import('./views/Goodsmanage/Goodsmange.vue')
        },
        // 统计管理部分
        {
          path:'/index/salesstatistics',
          name:'salesstatistics',
          component: () => import('./views/Salesstatistics/Salesstatistics.vue')
        },

        {
          path:'/index/stockstatistics',
          name:'stockstatistics',
          component: () => import('./views/Stockstatistics/Stockstatistics.vue')
        },
      ]
    },
  ]
})
