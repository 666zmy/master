<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <a-button type="primary">Button</a-button>
    <div style="margin-top:20px;">
      <a-table :columns="column" :data-source="data" :loading="loading">
        <span slot="mycaozuo" slot-scope="text, record">
              <a>{{text}}----</a>
              <a>{{record}}----</a>
              <a>删除{{text.key}}</a>
              <a>上传{{record.age}}</a>
        </span>
      </a-table>
      <h3>随机数</h3>
      <div @click="randomNumber">点我生成带有颜色的随机数 1到9</div>
      <h1 ref="number">{{number}}</h1>
    </div>

    <!-- 带有表单验证的  表单 -->
    <!-- <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="name" label="Activity name" prop="name">
        <a-input
          v-model="form.name"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="Activity zone" prop="region">
        <a-select v-model="form.region" placeholder="please select your zone">
          <a-select-option value="shanghai">Zone one</a-select-option>
          <a-select-option value="beijing">Zone two</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="Activity time" required prop="date1">
        <a-date-picker
          v-model="form.date1"
          show-time
          type="date"
          placeholder="Pick a date"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item label="Instant delivery" prop="delivery">
        <a-switch v-model="form.delivery" />
      </a-form-model-item>
      <a-form-model-item label="Activity type" prop="type">
        <a-checkbox-group v-model="form.type">
          <a-checkbox value="1" name="type">Online</a-checkbox>
          <a-checkbox value="2" name="type">Promotion</a-checkbox>
          <a-checkbox value="3" name="type">Offline</a-checkbox>
        </a-checkbox-group>
      </a-form-model-item>
      <a-form-model-item label="Resources" prop="resource">
        <a-radio-group v-model="form.resource">
          <a-radio value="1">Sponsor</a-radio>
          <a-radio value="2">Venue</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="Activity form" prop="desc">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">Reset</a-button>
      </a-form-model-item>
    </a-form-model> -->
    <button @click="reload">点我刷新</button>
    <h2>动态组件</h2>
    <button @click="currentView='One'">One</button>
    <button @click="currentView='Two'">Two</button>
    <div :is="currentView"></div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import One from "./components/one.vue"
import Two from "./components/two.vue"
//表头信息-的设置
const column = [
  {
    title: "性别", //该列所表现的title标题, 必写
    dataIndex: "sex", //对应标志 与dataSource中数据匹配的标识符，支持"info.sex"的方式 必写
  },
  {
    title: "年龄", //该列所表现的title标题,
    dataIndex: "age", //对应标志 与dataSource中数据匹配的标识符，支持"info.sex"的方式
    sorter: true, //rue，表示该列出现排序icon,在change事件中，能监听到对应的数据变化
  },
  {
    title: "注册日期", //该列所表现的title标题,
    dataIndex: "registDate", //对应标志 与dataSource中数据匹配的标识符，支持"info.sex"的方式
  },
  {
    title:'操作',
    scopedSlots:{customRender:'mycaozuo'}
  }
];
//内容区的设置
const data = [
  {
    key: "1",
    sex: "zmy",
    age: 32,
    registDate: "2049-5-09",
    width:20,
  },
  {
    key: "2",
    sex: "张木易",
    age: 27,
    registDate: "2029-5-09",
    width:30,
  },
  {
    key: "3",
    sex: "为安静",
    age: 2,
    registDate: "2019-5-09",
    ellipsis:true,
  },
];
export default {
  name: "App",
  components: {
    HelloWorld,
    One,
    Two
  },
  mounted() {
    this.recursion();
  },
  data() {
    return {
      currentView:One, // 默认显示第一个组件
      inject:['reload'],
      loading: false,
      data,
      column,
      red: "#f00",
      lastLevelArr: [],
      colorList: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
      ],
      number: "",
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        date1: [
          { required: true, message: "Please pick a date", trigger: "change" },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change",
          },
        ],
        resource: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    reload () {
       console.log(this,'this')
      //  this.reload()
    },
    // 表单函数
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid, "valid");
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    randomNumber() {
      //随机生成 1到9的随机数
      this.number = Math.floor(this.randomFun(1, 10));
      //生成 随机的16 进制的颜色代码
      let color = "#";
      let colorList = this.colorList;
      for (let i = 0; i < 6; i++) {
        let number = Math.floor(Math.random() * 16);
        color = color + colorList[number];
      }
      console.log(color, "color");
      //把样式添加到 随机数身上
      console.log(this.$refs.number, "refs");
      this.$refs.number.style = 'color:'+color
    },
    randomFun(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    recursion() {
      //某些时候，坑逼后台让我们遍历上面的一个数组，最后在页面上显示最后一级的最后一个数据。
      // 就是下面的数据：
      // 青苹果;红苹果;北方米饭;南方米饭;联想电脑;苹果电脑;锄头;锤子;洗发水;沐浴露;
      var data = [
        {
          name: "所有物品",
          children: [
            {
              name: "水果",
              children: [
                {
                  name: "苹果",
                  children: [{ name: "青苹果" }, { name: "红苹果" }],
                },
              ],
            },
            {
              name: "主食",
              children: [
                {
                  name: "米饭",
                  children: [{ name: "北方米饭" }, { name: "南方米饭" }],
                },
              ],
            },
            {
              name: "生活用品",
              children: [
                {
                  name: "电脑类",
                  children: [{ name: "联想电脑" }, { name: "苹果电脑" }],
                },
                {
                  name: "工具类",
                  children: [{ name: "锄头" }, { name: "锤子" }],
                },
                {
                  name: "生活用品",
                  children: [{ name: "洗发水" }, { name: "沐浴露" }],
                },
              ],
            },
          ],
        },
      ];
      console.log(111);
      this.getName(data);
      console.log(this.lastLevelArr, "lastLevelArr");
    },
    //递归获取  最后一级的数据
    getName(data) {
      for (let i in data) {
        //递归出口
        if (!data[i].children) {
          this.lastLevelArr.push(data[i].name); //只是push 最后一层数据
        } else {
          this.getName(data[i].children);
        }
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
