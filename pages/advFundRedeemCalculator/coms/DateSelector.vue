<template>
  <Popup
    v-model="showPopup"
    round
    position="bottom"
    class="date-selector-popup"
  >
    <DatetimePicker
      ref="picker"
      confirm-button-text="确定"
      type="date"
      title="请选择买入日期"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    />
    <RadioGroup v-model="timeFlag" class="radio-group" direction="horizontal">
      时间：
      <Radio name="0">15:00 前</Radio>
      <Radio name="1">15:00 后</Radio>
    </RadioGroup>
  </Popup>
</template>

<script>
import { Popup, DatetimePicker, RadioGroup, Radio } from 'vant'
export default {
  components: {
    Popup,
    DatetimePicker,
    RadioGroup,
    Radio,
  },
  props: {
    minDate: {
      type: Date,
      default: () => new Date('2025-01-01'),
    },
    maxDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      showPopup: false,
      timeFlag: '',
    }
  },
  methods: {
    handleConfirm(date) {
      if (this.timeFlag === '') {
        this.$toast('请勾选时间')
        return
      }
      this.showPopup = false
      this.$emit('confirm', { date, timeFlag: this.timeFlag })
    },
    handleCancel() {
      this.showPopup = false
      this.$emit('cancel')
    },
    show() {
      this.showPopup = true
    },
  },
}
</script>

<style lang="less" scoped>
.date-selector-popup {
  // 添加底部安全区域适配
  padding-bottom: 30px;
  box-sizing: border-box;
}

.radio-group {
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
