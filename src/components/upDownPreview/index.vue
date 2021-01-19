<template>
  <div class="box">
    第一种写法
    <a-input v-model="oneInput" />
    第二种写法
    <a-input :value="twoInput" @change="mychange" />
    <br />
    上传 预览 下载
    <!-- <a-upload
           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
           :mutiple="true"
           :file-list="fileList"
           @change="handlChange"
         >
         <a-button> <a-icon type="upload" /> Upload </a-button>
         </a-upload> -->
    头像上传
    <a-upload
           style="margin-left:200px;"
           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
           list-type="picture-card"
           :show-upload-list="false"
           @change="handlChange2"
           @download="handlDownLoad"
         >
         <img v-if="imgUrl" :src="imgUrl">
         <div v-else>
            <a-icon :type="loading?'loading':'plus'"></a-icon>
            <div>上传</div>
         </div>
         </a-upload>
    自定义文件预览
    <!-- <a-upload
      list-type="picture"
      action="//jsonplaceholder.typicode.com/posts/"
      :preview-file="previewFile"
    >
      <a-button> <a-icon type="upload" /> Upload </a-button>
    </a-upload> -->
    <a href="https://view.officeapps.live.com/op/view.aspx?src=https://fs.doqtech.com.cn/omstest/file/2020/09/07/l0lCb2OY8taXomhGW26pt7LjDRRlD1IL.xlsx">点我</a>

    <h3>使用封装的upload上传文件(pdf  excel word等)</h3>
    <Upload v-model="InititalfileList" :max="2"></Upload>
  </div>
</template>
<script>
export default {
  name: "UpDownPreview",
  data() {
    return {
      oneInput: "aa",
      twoInput: "bb",
      InititalfileList: [], // 这里的 表示上传成功后的图片 列表数据  用了 提交时候  放到form表单中  提前给一些接口
      imgUrl: "",
      loading: false,
    };
  },
  methods: {
    // 用value 和change方法来模拟 v-model的数据双向绑定
    mychange(e) {
      console.log(e.target.value, "每次打印看看");
      this.twoInput = e.target.value;
    },
    // 处理图片上传逻辑--前端上传完 会触发 调用接口成功上传-后端返回链接后 ---也会触发
    handlChange(e) {
      console.log(e, "eee");
      // 上传成功后 返回 url
      let fileList = e.fileList;
      fileList.map((item) => {
        if (item.response) {
          fileList.url = item.response.url;
        }
      });
      this.fileList = fileList;
    },
    handlChange2(e) {
      console.log(e, "eeeeee");
      // 开启loading
      if (e.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (e.file.status === "done") {
        this.getBase64(e.file.originFileObj, (res) => {
          console.log(res, "res");
          this.imgUrl = res;
          this.loading = false;
        });
      }
    },
    // 将上传的图片 转为base64进行展示
    // img 为上传的源文件
    getBase64(img, callback) {
      const reader = new FileReader(); //读取文件---读取上传的文件
      reader.onload = function(e) {
        // 文件读取成功完成时触发
        console.log(e);
        callback(e.target.result); //无论读取成功或失败，方法并不会返回读取结果，这一结果存储在 result属性中
      };
      reader.readAsDataURL(img); //将文件读取为 DataURL--base64的格式
      // reader.readAsBinaryString(img) // 将文件读取为 二进制流  通常我们将它传送到后端，后端可以通过这段字符串存储文件。
      // reader.readAsText(img) //该方法有两个参数，其中第二个参数是文本的编码方式，默认值为 UTF-8。这个方法非常容易理解，将文件以文本方式读取，读取的结果即是这个文本文件中的内容。
    },
    // 自定义文件的预览--比如word pdf等
    previewFile(file) {
     console.log('Your upload file:', file);
     fetch('api/json/get/4ytyBoLK8',{
         method:'post',
         body:file
     }).then(res => res.json()).then((res) => {
         console.log(res,'fffdres')
     })
    },
    // 自定义 下载逻辑
    handlDownLoad (e) {
        console.log(e,'eeee')
    }
  },
  watch:{
    'InititalfileList':function (newval) {
      console.log(newval, "父亲组件中的fileList文件")
    }
  }
};
</script>
