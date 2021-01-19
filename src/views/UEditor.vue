<template>
  <div>
    <a-form-model ref="ruleForm" :model="form">
      <a-form-model-item ref="name" label="Activity name" prop="name">
        <VueUeditorWrap
          v-model="form.desces"
          :config="myconfig"
          @ready="getExample"
          :destroy="true"
          @before-init="addCustomButtom"
        ></VueUeditorWrap>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  data() {
    return {
      form: {
        desces: "这是 vue-ueditor-wrap ！",
      },
      myconfig: {
        // 富文本编辑配置项
        serverUrl: "http://35.201.165.105:8000/controller.php", //开启上传功能，这里传入后端服务器接口地址---上传文件使用的地址
        UEDITOR_HOME_URL: "/UEditor/", // UEditor资源存放的路径，相对于打包后的index.html----使用vue-ueditor-warp不用配置，还有不用再ueditor.config.js里面配置，因为vue插件里面已经配置好了
        // 需要令此处的URL等于对应 ueditor.config.js 中的配置。
        autoHeightEnabled: false, //编辑器不自动被内容撑高
        autoFloatEnabled: false, // 工具栏是否可以浮动
        initialFrameHeight: 340, //初始化容器的高度
        intialFrameWidth: "100%", // 初始化容器的宽度
        enableAutoSave: true, // 关闭自动保存
        isShow: true, //是否显示编辑器
        elementPathEnabled: false
      },
    };
  },
  methods: {
    // 获取 UEditor 实例
    getExample(eitorInstance) {
      console.log(`编辑器实例`, eitorInstance);
    },
    // 进行二次开发（添加自定义按钮、弹窗等） before-init 的触发函数以 编辑器 id 和 配置参数 作为入参。
    addCustomButtom(editorId) {
      window.UE.registerUI(
        "test-button",
        function(editor, uiName) {
          // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
          editor.registerCommand(uiName, {
            execCommand: function() {
              editor.execCommand(
                "inserthtml",
                `<span>这是一段由自定义按钮添加的文字</span>`
              );
            },
          });

          // 创建一个 button
          var btn = new window.UE.ui.Button({
            // 按钮的名字
            name: uiName,
            // 提示
            title: "鼠标悬停时的提示文字",
            // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
            cssRules:
              "background-image: url('/test-button.png') !important;background-size: cover;",
            // 点击时执行的命令
            onclick: function() {
              // 这里可以不用执行命令，做你自己的操作也可
              editor.execCommand(uiName);
            },
          });

          // 当点到编辑内容上时，按钮要做的状态反射
          editor.addListener("selectionchange", function() {
            var state = editor.queryCommandState(uiName);
            if (state === -1) {
              btn.setDisabled(true);
              btn.setChecked(false);
            } else {
              btn.setDisabled(false);
              btn.setChecked(state);
            }
          });

          // 因为你是添加 button，所以需要返回这个 button
          return btn;
        },
        0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */,
        editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
      );
    },
  },
  components: {
    VueUeditorWrap,
  },
};
</script>

<style></style>
