<template>
  <div class="calendar_box">
    <a-calendar :disabledDate="disabledDate" @panelChange="panelChange" @select="select">
      <ul slot="dateCellRender" class="calender_ul" slot-scope="value">
        <li v-if="getDateComputed (value).dailyBudget">
          <p v-if="getDateComputed (value).dailyBudget">
            <span>日预算:</span>
            <i>￥{{ getDateComputed (value).dailyBudget }}</i>
          </p>
          <p>
            <span>高峰期:</span>
            <i>+{{ getDateComputed (value).peakDayRange }}%</i>
          </p>
          <p>
            ￥{{ getDateComputed (value).peakValue }}
          </p>
          <div class="dot_rot" v-if="getDateComputed (value).isSetBudgetDate"></div>
        </li>
      </ul>
    </a-calendar>
    <div class="footer">
      <a-button @click="cancel">取消</a-button>
      <a-button @click="confirm">确认设置</a-button>
    </div>
    <a-modal v-model="visible" @ok="handleOk" @cancel="handleCancel" :closable="false" width="40%">
      <DailyBudgetComponent :submitForm="submitForm"></DailyBudgetComponent>
    </a-modal>
  </div>
</template>
<script>
import DailyBudgetComponent from './../DailyCompoent/index'
import moment from 'moment'
export default {
  props: {
    // 接受 父组件传递过来的日期字典
    dateDictory: {
      type: Object,
      required: true
    }
  },
  name:'calendar',
  data () {
    return {
      visible: false, // 预算 小弹框 显示隐藏
      submitForm: { // 单一设定的form表单信息
         dailyBudget: undefined, // 普通日预算
         rise: false, // 高峰日预算
         peakDayRange: undefined, // 幅度
         isRise: false, // 上涨
         onOff: false // 按流量分配
      },
      currentDate: 0 // 当前点击的天
    }
  },
  created () {
    this.submitForm = JSON.parse(JSON.stringify(this.submitForm)) // 深拷贝预算小弹框
  },
  methods: {
    // 日期禁用
    disabledDate (current) {
      return current < moment().subtract(1, 'days') || current > moment().add(6, 'days')
    },
    // 日期面板变化回调
    panelChange (value, mode) {
      console.log(value, mode)
    },
    // 点击 每个单元格 日期
    select (value) {
      console.log(value)
      this.currentDate = value.date() // 存 当前点击天
      this.submitForm = this.dateDictory[value.date()] ? this.dateDictory[value.date()] : {} // 传递当前点击日期格子数据--预算弹框
      // 预算弹出框--出现
      this.visible = true
    },
    cancel () {
     // 日历组件 取消
     this.$emit('cancel', {
       budgetVisible: false
     })
    },
    confirm () {
      // 确认 所有修改 请求接口
      // do something
     // 日历组件 确认---把最新 字典传递给父组件
     this.$emit('confirm', {
       budgetVisible: false,
       dateDictory: this.dateDictory
     })
    },
    // 预算小弹框 取消回调
    handleCancel () {
      this.visible = false
    },
    // 预算小弹框 确认回调
    handleOk () {
      console.log(this.submitForm, 'submitForm')
      // 修改 字典里 对应天的数据为表单中数据
      this.$set(this.dateDictory, this.currentDate, this.submitForm)
      // 模拟接口 返回数据
      this.visible = false
    }
  },
  components: {
    DailyBudgetComponent
  },
  computed: {
    // eslint-disable-next-line no-unused-vars
    getDateComputed(value) {
       return value => this.dateDictory[value.date()] ? this.dateDictory[value.date()] : {}
    }
  }
}
</script>
<style lang="less" scoped>
.calendar_box {
    background: #cccccc;
    /deep/ .ant-fullcalendar-header .ant-radio-group  {
    display: none;
  }
 /deep/ .ant-fullcalendar-date {
    box-shadow:4px 2px 6px #e9e9e9;
    background: #fff;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    width: 90%;
    margin-bottom: 4px;
    padding:0;
    position: relative;
  }
/deep/ .ant-fullcalendar-fullscreen .ant-fullcalendar-content {
    height: auto;
    overflow: hidden;
    padding-left: 6%;
}
 /deep/ .ant-fullcalendar-disabled-cell div{
  color: #adadad !important;
}
 /deep/ .ant-fullcalendar-disabled-cell .dot_rot {
   background: #adadad !important;
 }
.calender_ul {
  display: flex;
  flex-direction: column;
  width: 88px;
  li {
    flex: 1;
    font-size: 1%;
    .dot_rot {
      width:10px;
      height: 10px;
      border-radius: 50%;
      background: #5288c5;
      position:absolute;
      left:6%;
      bottom:12%;
    }
    .disabled_active_dot {
      background: #adadad;
    }
  }
}
.footer {
  text-align: right;
  padding-bottom: 1%;
  & :nth-child(1) {
    margin-right: 5%;
    }
  }
}
</style>
