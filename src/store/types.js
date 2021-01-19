// 内定义常量，使用常量替代 mutation 事件类型 默认全部大写
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const DIVIDE = 'DIVIDE'
export default {
  INCREMENT,
  DECREMENT,
  DIVIDE
};
// 把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然。用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做。
