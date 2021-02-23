import Vue from 'vue';
import 'ant-design-vue/dist/antd.css';
// import './index/main'
import App from './App';
// 引入store文件下的 index.js并且注册
import store from "./store/index";
import './perset'
import './config/commnComponent'
import './direction'
import router from './router/index';
import treeItem from "./views/components/treeItem.vue";
import "./api/index"
// vue 项目移动端适配 引入两个包来实现
import 'lib-flexible' // 注意这个包的功能是--动态在heade标签中--添加meta--动态控制initial-scale,maximum-scale,minimum-scale等属性的值，所以你要把punblic下index.html中的header的meta删除掉
Vue.component("treeItem",treeItem)
Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');