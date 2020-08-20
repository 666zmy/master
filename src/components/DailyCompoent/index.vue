<template>
  <div class="daily_budget_box">
    <a-form-model ref="ruleForm" layout="inline" :model="submitForm" :rules="singleSetRules">
      <a-form-model-item prop="price" label="普通日预算">
        <a-input-number class="single_setting_input" v-model="submitForm.dailyBudget" />
        <span class="single_setting_span_left">元</span>
      </a-form-model-item>
      <br/>
      <a-form-model-item label="高峰日预算">
        <a-switch v-model="submitForm.rise"></a-switch>
        <span style="margin: 0 20px">幅度</span>
        <a-input-number class="single_setting_input" v-model="submitForm.peakDayRange" />
        <span class="single_setting_span_left">%</span>
        <span>450元</span>
      </a-form-model-item>
      <br/>
      <a-form-model-item label="上涨">
        <a-switch v-model="submitForm.isRise"></a-switch>
      </a-form-model-item>
      <br/>
      <a-form-model-item label="按流量分配">
        <a-switch v-model="submitForm.onOff"></a-switch>
      </a-form-model-item>
      <br/>
      <a-form-model-item label="日预算">
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
   props: {
     submitForm: {
       type: Object,
       required: true
     }
   },
   data () {
     return {
        singleSetRules: {} // 单一设定form表单的校验
     }
   },
   mounted () {
     console.log(this.submitForm, '儿子')
     this.$emit('getsubmitForm', {
       submitForm: this.submitForm
     })
   },
   methods: {}
}
</script>
<style lang="less" scoped>
   .daily_budget_box {
      /deep/.ant-form-item {
          margin-bottom: 0;
            .ant-form-item-label {
              width: 80px;
            }
          .ant-form-item-control-wrapper {
             width: 400px;
            .single_setting_input {
               width: 30%;
            }
          }
        }
      span {
          margin-right: 2%;
        }
      .single_setting_span_left {
          margin-left: 2%;
        }
   }
</style>
