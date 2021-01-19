// 内写原来的 actions ，就是要执行的动作，如流程的判断、异步请求
import types from "./types";
const actions = {
    incrementAsync({commit}) {
        // 异步操作
        let p = new Promise((resolve) =>{
            setTimeout(() => {
              resolve()
            },3000)
        })
        p.then(() => {
            commit(types.INCREMENT)
        }).catch(() => {
            console.log("异步操作")
        })
    },
    decrementAsync({commit}) {
        new Promise((resolve) => {
            setTimeout(() => {
              resolve()
            },2000)
        } ).then(() =>{
            commit(types.DECREMENT)
        })
    }

}
// 最后导出
export default actions