// 用户组件模块下的  state  getters  actions mutations
// user.js 内写该 user 组件内用到的 state 、 getters 、 actions 和 mutations
import Types from "./../types"; // 引入维护的常量
const state = {
  count: 4,
};
// 定义getters
let getters = {
  count(state,getters,rootState) {
    console.log(state,'局部state',getters,rootState,"只有getters才有")
    return state.count;
  },
};
// 定义actions
const actions = {
  increment(content) {
    console.log(content, "content");
    // 此处提交的事件与下方 mutations 中的 types.INCREMENT 对应
    //与原来 commit('increment') 的原理相同，只是把类型名换成了常量
    content.commit(Types.INCREMENT);
  },
  decrement(content) {
    // 此处提交的事件与下方 mutations 中的 types.DECREMENT 对应
    if (content.state.count > 10) {
      content.commit(Types.DECREMENT);
    }
  },
  divideMethod(content) {
    content.commit(Types.DIVIDE)
}
};
// 定义mutations
const mutations = {
  // 此处的事件为actions中的commit(type.INCREMENT);
  [Types.INCREMENT](state) {
    state.count++;
  },
  [Types.DECREMENT](state) {
    state.count--;
  },
  [Types.DIVIDE](state) {
    state.count/2;
  }
};
// 最后统一导出
export default {
  state,
  mutations,
  actions,
  getters,
};
