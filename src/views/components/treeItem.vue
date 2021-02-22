<template>
  <div class="overAll">
    <li>
      <div :class="{ bold: isFolder }" @click="toggle">
        {{ item.name }}
        <span v-if="isFolder">[{{ isOpen ? "-" : "+" }}]</span>
      </div>
      <ul v-show="isOpen">
        <tree-item
          class="item"
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
        >
        </tree-item>
      </ul>
    </li>
  </div>
</template>

<script>
// isFolder 当前是否是  折叠状态--折叠起来时候加粗
export default {
  props: {
    item: {
      type: Object,
      required: true,
    }, //接受item
  },
  data() {
    return {
      isOpen: false, // 控制是否展开子组件数据
    };
  },
  computed: {
    isFolder: function() {
      return this.item.children && this.item.children.length;
    },
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
        console.log(1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bold {
  font-weight: 700;
  font-size: 20px;
}
.item {
    li {
      
    }
}
</style>
