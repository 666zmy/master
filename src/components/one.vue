<template>
  <div id="box">
    <div class="father" @click="chooseImage">
      <h3>上传图片</h3>
      <input type="file" ref="upload_file" style="display:none" @change="photoChange"  name="file"/>
    </div>
    <div class="calendar">
        <h3>日历</h3>
        <button @click="budgetVisible=true">点我显示日历</button>
      </div>
        <!-- 预算 弹出框 -->
  <a-modal :closable="false" :visible="budgetVisible" :footer="null" width="60%">
    <CalendarComponent @cancel="calendarCancel" @confirm="calendarConfirm" :dateDictory="dateDictory"></CalendarComponent> 
  </a-modal>
  </div>
</template>
<script>
import CalendarComponent from './calendar/calendarComponent'
import axios from "axios"
export default {
  data() {
    return {
          dateDictory: { // 日期所需字典
          1: { dailyBudget: 12, peakDayRange: 33, rise: false, isRise: false, onOff: false, isSetBudgetDate: false },
          2: { dailyBudget: 12, peakDayRange: 33, rise: false, isRise: false, onOff: false, isSetBudgetDate: false },
          8: { dailyBudget: 12, peakDayRange: 33, rise: false, isRise: false, onOff: false, isSetBudgetDate: false },
          10: { dailyBudget: 12, peakDayRange: 33, rise: false, isRise: false, onOff: false, isSetBudgetDate: false },
          15: { dailyBudget: 12, peakDayRange: 33, rise: false, isRise: false, onOff: false, isSetBudgetDate: false },
          20: { dailyBudget: 12, peakDayRange: 33, rise: false, isRise: false, onOff: false, isSetBudgetDate: false }
      },
      // 日历弹出框
      budgetVisible: false, 
    }
  },
  methods: {
    // 日历 的取消
    calendarCancel (res) {
     this.budgetVisible = res.budgetVisible
    },
    // 日历 确认
    calendarConfirm (res) {
     console.log(res, 'res--vb')
     this.budgetVisible = res.budgetVisible
     // 接受 子组件传递过来 最新的字典数据 修改父组件当前的字典数据
     this.dateDictory = res.dateDictory
    },
    // ----------------日历----------
    //点击父亲chooseImage 就会触发input标签的photoChange事件
    chooseImage() {
      this.$refs.upload_file.click();
    },
    photoChange (e) {
        console.log(e.target.files, 'e.target.files')
        let arrIndex = Object.keys(e.target.files)
        console.log(arrIndex,'arrIndex')
        var formadata = new FormData();
        formadata.append('file',e.target.files)
        axios.post('v2/5cc8019d300000980a055e76',formadata).then((res) => {
            console.log(res)
        })
    }
  },
  components: {
    CalendarComponent
  }
};
</script>
<style lang="less" scoped>
.father {
  width: 100px;
  height: 100px;
  background: #ff0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>