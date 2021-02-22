<script>
// Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用渲染函数，它比模板更接近编译器。
export default {
  data() {
    return {
      title: "buibui",
    };
  },
  render: function(createElement) {
    // let _this = this['$options'].parent // 当写在组件中 .vue 文件的 components 中写的，这样写才能访问this
    let _slots = this.$slots; // $slots: vue中所有分发插槽，不具名的都在default里
    console.log(_slots, "_slots");
       /**
    * createElement 本身也是一个函数，它有三个参数
    * 返回值: VNode，即虚拟节点
    * 1. 一个 HTML 标签字符串，组件选项对象，或者解析上述任何一种的一个 async 异步函数。必需参数。{String | Object | Function} - 就是你要渲染的最外层标签
    * 2. 一个包含模板相关属性的数据对象你可以在 template 中使用这些特性。可选参数。{Object} - 1中的标签的属性
    * 3. 子虚拟节点 (VNodes)，由 `createElement()` 构建而成，也可以使用字符串来生成“文本虚拟节点”。可选参数。{String | Array} - 1的子节点，可以用 createElement() 创建，文本节点直接写就可以
    */
    return createElement(
      "div", // 1.要渲染的标签名称： 第一个参数必：须
      {
        // 2. 1中渲染的标签的属性，详情查看文档：  第二个参数【可选】
        style: {
          color: "#f00",
        },
      },
      [
        // 3. 1中渲染的标签的子元素数组：第三个参数【可选】
        "我是文本节点", // 文本节点直接写就行
        //   _this.$slots.default,  // 所有不具名插槽，是个数组
        createElement("p", this.title), // createElement()创建的VNodes
      ]
    );
  },
  // render() {
  //     return(
  //         <h1><b><s>{ this.title}</s></b></h1>
  //     )
  // }
};
</script>
