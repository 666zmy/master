<template>
  <div>
      <button v-preventReClick @click="preventReclick">阻止用户在短时间内频繁多出点击按钮</button>
  </div>
</template>

<script>
export default {
   methods: {
       preventReclick() {
           console.log("点击");
       }
   }
}
</script>

<style lang="less" scoped>

</style>