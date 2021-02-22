<template>
  <div>
    <h1>vue树形结构</h1>
    <ul id="treeDemo">
      <tree-item :item="treeData"></tree-item>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData:{
        name: "河南省",
        children: [
          { name: "北京市" },
          { name: "上海市" },
          {
            name: "郑州市",
            children: [
              {
                name: "驻马店市",
                children: [{ name: "西平县" }, { name: "上蔡县" }]
              },
              { name: "周口市" },
              { name: "商丘市" },
              {
                name: "南阳市",
                children: [{ name: "确山县" }, { name: "商水县" }]
              }
            ]
          }
        ]
      }
    };
  },
};
</script>

<style></style>
