// 用来组装 action.js  getter.js  user.js的  然后进行统一的导出
import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import getters from "./getters";
import actions from "./action";
import mutations from "./mutation"
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    rootCount: 100,
  },
  mutations,
  getters,
  actions,
  modules: {
    user,
  },
});
export default store;
