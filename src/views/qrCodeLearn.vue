<template>
  <div class="overAll">
         <div id="qrcode"></div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';
export default {
   mounted() {
       console.log(1111);
       let qrcode = new QRCode('qrcode', {
           width: 150, // 图像宽度
           height: 150, // 图像高度
           colorDark: "#000", //前景色
           colorLight: "#fff", // 背景色

       })
    //    qrcode.clear(); // 清除二维码
       qrcode.makeCode("https://www.iconfont.cn/") // 生成一个新的二维码
   }
}
</script>

<style lang="less" scoped>

</style>