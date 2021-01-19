// 内写原来的 getters ，用来获取属性
// 因为数据从user.js获取 所以要引入该文件
import  user from "./modules/user";
const getters = {
    isEvenorOdd() {
        // // 注意数据是从 user.js 中获取的，所以写成 user.state.count
        return user.state.count % 2 ===0 ? '偶数': '奇数'
    }
}
export default getters;