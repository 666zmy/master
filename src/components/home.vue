<template>
  <div class="box">
    <h3>我是home页面</h3>
    <div class="action">
      <button @click="$router.push('/liandong')">导航联动实现</button>
      <button @click="$router.push('/vModel')">子组件身上绑定的v-model</button>
      <button @click="$router.push('/upDownPreview')">文件上传下载预览</button>
      <button @click="$router.push('/direction')">自定义指令</button>
      <button @click="goVueRespon">vue的响应式</button>
      <button @click="$router.push('/vuexComponent')">vuex学习</button>
      <button @click="$router.push('/preventReclick')">
        vue-指令-防止用户在短时间内频繁点击
      </button>
      <button @click="$router.push('/qrCodeLearn')">
        qrcode前端生成二维码的工具
      </button>
      <button @click="$router.push('/UEditor')">
        vue使用 Ueditor富文本编辑器
      </button>
      <button @click="$router.push('/websocket')">
        websocket使用和html5桌面通知
      </button>
      <button @click="$router.push('/render')">
        render函数的使用
      </button>
      <button @click="$router.push('/ddVueH5SaoMaDengLu')">
       基于钉钉的vue 后台管理系统 后台扫码登录功能
      </button>
      <button @click="$router.push('/vueTree')">
     vue树形结构
      </button>
    </div>
    <div class="list">
      <div class="list_item" v-for="(item,index) in null" :key="index">{{item}}级</div>
    </div>
    <img :src="imgSrcObh.src"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userid: [],
      imgSrcObh:{
        src: "http://chuantu.xyz/t6/741/1613985133x1700338641.jpg"
      } 
    };
  },
  created() {
    console.log(process.env,"process")
    setTimeout(() => {
      this.userid = [23343];
      if (localStorage.getItem("age")) {
        // 缓存中有---
        console.log("have");
      } else {
        console.log("nohave,开始种localStorage");
        localStorage.setItem("age", 12); // 进入首页种一个缓存
      }
    }, 500);
  },
  mounted() {
    console.log(this.userid, "this.userid");
    this.oopMethod();
  },
  methods: {
    goVueRespon() {
      this.$router.push({ path: "/vueRespon", query: { id: 1, name: "ff" } });
    },
    oopMethod() {},
  },
  watch: {
    userid: (newval, oldval) => {
      console.log(newval, oldval);
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  .action {
    display: flex;
  }
}
</style>
