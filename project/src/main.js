/*入口文件*/ 
import Vue from 'vue'

// 引入elemenui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// base.css
import './assets/styles/css/base.less'
// 引入字体图标css
import './assets/styles/css/iconfont.css'

import App from './App.vue'
import router from './router'

// request.js
import request from './api/request'



// 把request挂在vue的原型上，其他组件共享
Vue.prototype.req=request;

// 使用ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
