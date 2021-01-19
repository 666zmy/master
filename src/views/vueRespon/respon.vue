<template>
  <div>
    <a-input @keyinput="press" placeholder="输入"></a-input>
    <a-button type="" @click="clickBtn">css来移出所有事件</a-button>
    <a-upload list-type="picture" :preview-file="previewFile">
      <a-button> <a-icon type="upload" /> Upload </a-button>
    </a-upload>
    <a-button @click="warning">
      Warning
    </a-button>
    <a-button type="" @click="pdfUp">pdf up</a-button>
    <input type="file" id="inputBox" @change="change" />
    <img src="" id="img" />
    <a-upload></a-upload>
    <a-upload
      name="file"
      :multiple="true"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :headers="{ authorization: 'authorization-text' }"
      @change="handleChange"
    >
      <a-button> <a-icon type="upload" /> Click to Upload </a-button>
    </a-upload>
    <ul>
      <li v-for="item in list" :key="item.age">{{item.name}}</li>
    </ul>
    <div contenteditable="true" style="outline: none" @input="input">添加属性contenteditable --标签可以编辑但是不能使用change事件---不能使用maxlength属性</div>
    <a-button type="primary" @click="onReload">点我实现reload刷新当前页面</a-button>
  </div>
</template>
<script>
import { Modal } from "ant-design-vue";
export default {
  inject:["reload"],
  data() {
    return {
      list: [],
      chunkList: [], //分片list
    };
  },
  mounted() {
     setTimeout(() => {
       for (let i=0; i< 100; i++) {
         this.list.push({
           name: 'zz',
           age: i
         })
       }
     }, 1000);
  },
  methods: {
    change() {
      var inputBox = document.getElementById("inputBox");
      console.log(inputBox.files,"chang")
        var reader = new FileReader();
        reader.readAsDataURL(inputBox.files[0]); //发起异步请求
        reader.onload = function(e) {
          console.log(e,"eef")
          //读取完成后，将结果赋值给img的src
          // img.src = this.result;
        };
    },
    previewFile(file) {
      var that = this;
      console.log("Your upload file:", file);
      // 这里我们将切片固定成六分，也可以固定大小上传(分6次上传我的大文件)
      //   let chunkList = []; //分片list
      let current = 0;
      let fileName = new Date().getTime() + "_" + file.name;
      var chunkSize = file.size / 6; //每次上传文件的大小  分6次上传
      while (current < 6) {
        // 把每次上传的file文件转成base64
        let sliceData = file.slice(
          current * chunkSize,
          (current + 1) * chunkSize
        ); // slice方法第一次开始上传 值  第一次结束值    依次类推
        let sliceReader = new FileReader();
        sliceReader.readAsDataURL(sliceData);
        sliceReader.onloadend = function(base64Res) {
          console.log(base64Res, "base64Res");
          that.chunkList.push({
            chunk: base64Res.currentTarget.result,
            fileName: current + "_" + fileName,
          });
          console.log(that.chunkList, "chunkList");
        };
        current++;
      }
      // Your process logic. Here we just mock to the same file
      return fetch("/api/json/get/4ytyBoLK8", {
        method: "POST",
        body: file,
      })
        .then((res) => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
    press(e) {
      console.log(e, "eee");
      if (e.keyCode === 16 && e.keyCode == 52) {
        console.log("输入了特殊字符$");
      }
    },
    clickBtn() {
      console.log(1111);
    },
    warning() {
      Modal.warning({
        title: "This is a warning message",
        content: "some messages...some messages...",
      });
    },
    pdfUp() {
      var img = new FileReader();
      img.src = "/src/assets/pdf/豆蔻运营系统.pdf";
      setTimeout(() => {
        console.log(img.width, img.height, "img");
      }, 2000);
    },
    handleChange(info) {
      console.log(info, "info");
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    input(e) {
      console.log(e,"div-变为input输入-可以使用input事件")
    },
    onReload() {
      console.log("reload")
      this.reload()
    }
  },
};
</script>
