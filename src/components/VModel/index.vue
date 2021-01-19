<template>
  <div class="box">
    <vModelChildren v-model="test"></vModelChildren>
    <vModelChildren2 v-model="test2"></vModelChildren2>
  </div>
</template>
<script>
import vModelChildren from "./../../custmerCompenent/vModelChildren";
import vModelChildren2 from "./../../custmerCompenent/vModelChildren2";
export default {
  data() {
    return {
      test: "哭aaa",
      test2: "父组件",
    };
  },
  beforeCreate() {
    console.log("父-beforeCreate");
  },
  created() {
    console.log("父-created");
  },
  beforeMount() {
    console.log("父-beforeMount");
  },
  mounted() {
    console.log("父-mounted");
  },
  components: {
    vModelChildren,
    vModelChildren2,
  },
};
</script>
