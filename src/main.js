import Vue from 'vue';
import 'ant-design-vue/dist/antd.css';
// import './index/main'
import App from './App';
// 引入store文件下的 index.js并且注册
import store from "./store/index";
import './perset'
import './config/commnComponent'
import './direction'
import router from './router/index'
Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');