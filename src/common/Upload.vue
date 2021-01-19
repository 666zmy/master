<template>
  <div class="box">
    <a-upload
      :file-list="myFileList"
      name="file"
      :multiple="true"
      action="https://fs.doqtech.com.cn/test/filesystem/ajax/upload/file"
      @change="handleChange"
    >
      <a-button> <a-icon type="upload" /> Click to Upload </a-button>
    </a-upload>
  </div>
</template>
<script>
// action  上传服务器地址  成功后 后端会返回 文件的外链url和文件的名字
// multiple 是否支持 多张图片上传
// name 发送到后台文件参数名字
// headers  设置上传的请求头部，IE10 以上有效
// fileList  已经上传的文件列表
// listType 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card  默认text
// directory  是否支持上传文件夹  默认fasle
// accept  接受上传文件类型   默认无  都接受
export default {
  props: {
    InititalfileList: {
      type: Array,
      default: () => [],
    },
    max: {
      // 最多上传几张
      type: Number,
      default: 999,
    },
  },
  model: {
    prop: "InititalfileList",
    event: "change", // 触发change事件就可以 修改父组件里的v-model的值
  },
  data() {
    return {
      myFileList: this.InititalfileList,
    };
  },
  created() {
    // console.log(111)
  },
  methods: {
    //上传文件改变时的状态,, change能接受到
    handleChange(info) {
      console.log(info, "ifno");
      let fileListTemp = [...info.fileList];
    //   console.log(fileListTemp, "fileList");
      // 1 限定上传文件 个数
      if (this.myFileList.length > this.max) {
        fileListTemp = fileListTemp.slice(-this.max);
      }
      // 2. read from response and show file link 从响应读取并显示文件链接
      fileListTemp.forEach((item) => {
        console.log(item, "file-item");
        // 3--加入loading上传效果       // 提示信息
        if (item.status === "uploading") {
          this.$message.loading({ content: "上传中..." ,key:1});
        }
        // 这里是 1后端接口响应   2 且响应成功后  返回的信息---根据接口返回的数据来改动
        if (item.response) {
          if (item.response.success) {
            const voObject = item.response.vo;
            item.url = voObject.fileUrl;
            item.name = voObject.fileName;
            this.$message.success({ content:`${info.file.name}上传成功`, key:1});
          } else {
               this.$message.error("上传失败");
          }
        }
      });
    //   // 3 更新fileList列表 为上传后的 fileList新列表
      this.myFileList = fileListTemp;
    },
  },
  watch: {
    // j监听 prop传递过来的InititalfileList 如果父级有变化 ，将子组件的fileList跟着变动   父变子变
    InititalfileList(newVal) {
      this.myFileList = newVal;
    },
    // 监听 子组件 中数据变动 那么就传递给父组件 达到子变父亲变得效果
    myFileList: function(newVal) {
      this.$emit("change", newVal);
    },
  },
};
</script>
<style lang="less" scoped></style>
