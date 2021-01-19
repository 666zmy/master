<template>
  <div class="overAll">
    <h3>websocket链接</h3>
    <button @click="requestWs">点击发起websocket请求</button>
  </div>
</template>

<script>
import { sendWebsocket, closeWebsocket } from "./../utils/websocket";
export default {
  data() {
    return {
         notification: null
    }
  },
  mounted() {
    // html2 桌面通知 Notification API
    console.log(Notification.permission); // 用户权限  default 不知道用户的选择   granted用户允许   denied 用户拒绝
    //1--当用户还没选择   default时候，，我们需要用户去请求权限。Notification对象提供了 requestPermission()方法请求用户当前来源的权限以显示通知
    Notification.requestPermission().then(function(permission) {
      console.log(permission, "permission");
      if (permission === "granted") {
        console.log("用户允许通知了");
      } else if (permission === "denied") {
        console.log("用户拒绝通知");
      }
    });
    // 2--- 当1用户允许(授权之后)  请求权限之后 我们就可以推送通知了
    //     参数如下：

    // title：通知的标题
    // options：通知的设置选项（可选）。
    // body：通知的内容。
    // tag：代表通知的一个识别标签，相同tag时只会打开同一个通知窗口。
    // icon：要在通知中显示的图标的URL。
    // image：要在通知中显示的图像的URL。
    // data：想要和通知关联的任务类型的数据。
    // requireInteraction：通知保持有效不自动关闭，默认为false。

  this.notification = new Notification("欢迎浏览", {
      // 通知的标题
      body: "点击获取更多福利", // 通知的内容。
      tag: "geekjc", // 代表通知的一个识别标签，相同tag时只会打开同一个通知窗口
      icon: "https://s3.ax1x.com/2021/01/19/sgaAyT.png", //要在通知中显示的图标的URL。
      requireInteraction: true, //requireInteraction：通知保持有效不自动关闭，默认为false。
      data: {
        // 想要和通知关联的任务类型的数据。
        url: "https://www.dianping.com",
      },
    });
    // 3- 关闭通知
    // 从上面的参数可以看出，并没有一个参数用来配置显示时长的。我想要它 10s 后自动关闭的话，这时可以调用 close() 方法来关闭通知。
    setTimeout(() => {
      this.notification.close();
    }, 10000);
    // 4- 事件
    // Notification 接口的 onclick属性指定一个事件侦听器来接收 click 事件。当点击通知窗口时会触发相应事件，比如打开一个网址，引导用户回到自己的网站去。
    // 点击了 通知窗口---触发--进行业务逻辑处理
    this.notification.onclick = () => {
      console.log(this.notification, "notification");
      window.open(this.notification.data.url, "_blank"); // 打开通知关联的任务类型的数据--notification下的data 中的数据
      // this.notification.close();
    };
  },
  methods: {
    requestWs() {
      //0- // 防止用户多次连续点击发起请求，所以要先关闭上次的ws请求。
      closeWebsocket();
      // 发起ws请求
      sendWebsocket(
        "ws://test.ws.com",
        { name: "zz" },
        this.wsMessage,
        this.wsError
      );
    },
    wsMessage(data) {
      console.log(data, "后端返回的数据");
    },
    wsError() {
      //出现错误--然后逻辑处理
    },
  },
  beforeDestroy() {
    // 页面销毁时关闭ws。因为有可能ws连接接收数据尚未完成，用户就跳转了页面
    //在需要主动关闭ws的地方都可以调用该方法
    closeWebsocket();
    // notification  关闭页面标签的时候  是否关闭浏览器通知
       this.notification.close()

  },
};
</script>

<style lang="less" scoped></style>
