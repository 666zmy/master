<template>
  <div id="overAll">
    <input v-model="inputValue" @input="input"/>
    <button @click="ToParent">点我</button>
    <input v-model="pageConfig.searchForm.json.type"/>
              <a-checkbox-group v-model="pageConfig.searchForm.aa.type">
            <a-checkbox value="maidian"> 买单 </a-checkbox>
            <a-checkbox value="tuangou"> 团购 </a-checkbox>
          </a-checkbox-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
        inputValue: this.value,
        pageConfig: {
          searchForm: {
            json: {
              type: 'v-model数据绑定深层问题'
            },
            aa: {
              type: ["tuangou"]
            }
          }
        }
    };
  },
  methods: {
    ToParent() {
      this.$emit("input", "89");
    },
    input(e) {
        console.log(e,"eeee")
        this.$emit("input",e.target.value)

    }
  },
};
</script>

<style></style>
