<template>
  <div class="screen-month-picker" v-show="visible" :style="positionStyle">
    <div class="trigger" :style="triggerStyle"></div>
     <div class="screen-month-picker-calendar"
       :style="{ height: visible ? '260px' : '0px',
                 opacity: visible ? '1' : '0'}">
    <div class="screen-month-picker-calendar-header">
      <div class="left-sword"
            @click="delYear">
        <svg-icon icon-class="shuangjiantouzuo"
                  fill="#dcdfe6"></svg-icon>
      </div>
      <div class="year">{{ changeYear | formatYear }}</div>
      <div class="right-sword"
            @click="addYear">
        <svg-icon icon-class="shuangjiantouyou"
                  fill="#dcdfe6"></svg-icon>
      </div>
    </div>
    <div class="screen-month-picker-calendar-body">
      <div v-for="item in monthList"
            @click.stop="onChangeMonth(item.value)"
            :class="[ 'month', item.select && currentYear === changeYear ? 'active' : '']"
            :key="item.value">
        {{ item.label }}
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { getLastestMonth } from 'src/utils/common.js'
export default {
  name: 'screen-month-picker',
  data () {
    return {
      selectedLabel: '',
      monthList: [
        { label: '一月', value: '1', select: false },
        { label: '二月', value: '2', select: false },
        { label: '三月', value: '3', select: false },
        { label: '四月', value: '4', select: false },
        { label: '五月', value: '5', select: false },
        { label: '六月', value: '6', select: false },
        { label: '七月', value: '7', select: false },
        { label: '八月', value: '8', select: false },
        { label: '九月', value: '9', select: false },
        { label: '十月', value: '10', select: false },
        { label: '十一月', value: '11', select: false },
        { label: '十二月', value: '12', select: false }
      ],
      currentYear: 0,
      changeYear: 0,
      positionStyle: {},
      triggerStyle: {}
    }
  },
  props: {
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '30px'
    },
    // 默认是上个月的时间
    defaultValue: {
      type: String,
      default: () => {
        return getLastestMonth()
      }
    },
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'center'
    }
  },
  watch: {
    selectedLabel: {
      immediate: true,
      handler: function (newValue) {
        const monthList = this.monthList
        monthList.forEach(item => {
          const month = newValue.substring(4, 6)
          if (parseInt(item.value) === parseInt(month)) {
            item.select = true
          } else {
            item.select = false
          }
        })
        this.monthList = monthList
        this.currentYear = parseInt(newValue.substring(0, 4))
        this.changeYear = parseInt(newValue.substring(0, 4))
      }
    },
    defaultValue: {
      immediate: true,
      handler: function (newValue) {
        this.selectedLabel = newValue
      }
    },
    position: {
      immediate: true,
      handler: function (val) {
        if (val === 'left') {
          this.positionStyle = { left: 0 }
          this.triggerStyle = { left: '-120px' }
        } else if (val === 'right') {
          this.positionStyle = { right: 0 }
          this.triggerStyle = { right: '-120px' }
        } else if (val === 'center') {
          this.positionStyle = {}
          this.triggerStyle = {}
        }
      }
    }
  },
  filters: {
    formatYear (value) {
      if (value) {
        return `${value}年`
      }
    },
    formatMonth (value) {
      if (value) {
        return `${value.substring(0, 4)}年${parseInt(value.substring(4, 6))}月`
      } else {
        return value
      }
    }
  },
  methods: {
    onChangeMonth (month) {
      const chooseMonth = month > 9 ? month : `0${month}`
      this.selectedLabel = `${this.changeYear}${chooseMonth}`
      this.$emit('chooseMonth', {
        year: this.changeYear,
        month
      })
      this.$emit('update:visible', false)
    },
    delYear () {
      if (new Date().getFullYear() - this.changeYear < 10) {
        this.changeYear -= 1
      }
    },
    addYear () {
      if (this.changeYear < new Date().getFullYear()) {
        this.changeYear += 1
      }
    }
  }
}
</script>
<style scoped lang="scss">
.screen-month-picker {
  position: absolute;
  top: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  .trigger {
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-bottom: 10px solid #061a3b;
    position: relative;
  }
  .screen-month-picker-calendar {
    width: 320px;
    height: 0px;
    opacity: 1;
    box-shadow: 0 2px 12px 0 #5c7bc7;
    background: #061a3b;
    z-index: 102;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 12px;
    transition: height 0.2s linear, opacity 0.2s linear;
    overflow: hidden;
    &-header {
      width: 100%;
      height: 30px;
      padding-bottom: 12px;
      margin-top: 12px;
      border-bottom: 1px solid #47556f;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .year {
        color: #fff;
        line-height: 30px;
        font-size: 16px;
      }
      .right-sword,
      .left-sword {
        cursor: pointer;
      }
    }
    &-body {
      width: 100%;
      height: calc(100% - 30px - 12px - 12px - 1px);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
      .month {
        font-size: 14px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
          color: #2bccff;
        }
      }
      .active {
        color: #2bccff;
      }
    }
  }
}

</style>
