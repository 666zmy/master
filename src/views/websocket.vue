<template>
  <div class="overAll">
    <h3>websocket链接</h3>
    <button @click="requestWs">点击发起websocket请求</button>
  </div>
</template>

<script>
import { sendWebsocket, closeWebsocket } from "./../utils/websocket";
export default {
  mounted() {
    // html2 桌面通知 Notification API
    console.log(Notification.permission) // 用户权限  default 不知道用户的选择   granted用户允许   denied 用户拒绝
    //1--当用户还没选择   default时候，，我们需要用户去请求权限。Notification对象提供了 requestPermission()方法请求用户当前来源的权限以显示通知
    Notification.requestPermission().then(function (permission) {
      console.log(permission,"permission");
      if (permission === 'granted') {
        console.log('用户允许通知了')
      } else if (permission ==='denied') {
        console.log("用户拒绝通知")
      }

    })
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
  },
};
</script>

<style lang="less" scoped></style>
