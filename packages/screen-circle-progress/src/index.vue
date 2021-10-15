<template>
  <div class="screen-circle-progress"
       :style="{width: width + 'px', height: width + 'px'}">
    <canvas :class="`progress-${comKey}`"
            :width="width"
            :height="width">
    </canvas>
    <div class="num">
      {{num}}
    </div>
  </div>
</template>

<script>
import CircleProgress from './circleProgress'
import { generateID } from 'src/utils/common'
export default {
  name: 'screen-circle-progress',
  data () {
    return {
      comKey: generateID()
    }
  },
  props: {
    width: {
      type: Number,
      default: 100
    },
    radius: {
      type: Number,
      default: 50
    },
    lineWidth: {
      type: Number,
      default: 8
    },
    activeColor: {
      type: String,
      default: '#fff'
    },
    bgColor: {
      type: String,
      default: '#666'
    },
    percent: {
      type: Number,
      default: 0
    },
    degreeStart: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 2
    },
    num: {
      type: Number,
      default: 0
    }
  },
  watch: {
    _props: {
      immediate: true,
      deep: true,
      handler: function (value) {
        this.$nextTick(() => {
          this.init()
        })
      }
    }
  },
  methods: {
    init () {
      const ele = document.querySelectorAll(`.progress-${this.comKey}`)[0]
      const progress = new CircleProgress(ele, {
        radius: this.radius,
        lineWidth: this.lineWidth,
        activeColor: this.activeColor,
        bgColor: this.bgColor,
        percent: this.percent,
        degreeStart: this.degreeStart,
        step: this.step
      })
      progress.render()
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-circle-progress {
  position: relative;
  .num {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    color: #fff;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
