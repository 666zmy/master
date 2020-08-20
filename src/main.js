import Vue from 'vue';
import 'ant-design-vue/dist/antd.css';
import App from './App';
import './perset'
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');