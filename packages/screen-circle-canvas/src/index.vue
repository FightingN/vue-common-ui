<template>
  <div class="screen-circle-canvas">
    <canvas :id="`myCanvas-${id}`" :width="width" :height="width" />
  </div>
</template>

<script>
import CircleCanvas from './CircleCanvas'
import { generateID } from 'src/utils/common'
export default {
  name: 'ScreenCircleCanvas',
  props: {
    // id: {
    //   type: Number,
    //   default: 1
    // },
    // 圆环半径
    circleRadius: {
      type: Number,
      default: 60
    },
    // 小圆点半径
    pointRadius: {
      type: Number,
      default: 6
    },
    // 小圆点颜色
    pointColor: {
      type: String,
      default: '#FF4949'
    },
    visiblePoint: {
      type: Boolean,
      default: true
    },
    // 圆环宽度
    circleWidth: {
      type: Number,
      default: 6
    },
    // 圆环颜色
    circleColor: {
      type: String,
      default: '#eee'
    },
    // 百分比数值
    percentage: {
      type: Number,
      default: 50,
      validator: function (value) {
        return value >= 0 && value <= 100
      }
    },
    // 字体颜色
    fontColor: {
      type: String,
      default: '#000'
    },
    // 字体大小
    fontSize: {
      type: String,
      default: '30'
    },
    // 进度圆环颜色
    progressColor: {
      type: String,
      default: 'red'
    },
    // 进度圆环宽度
    progressWidth: {
      type: String,
      default: '6'
    },
    // 开始角度----暂未设置
    startDeg: {
      type: Number,
      default: 0
    },
    // 初始动画周期，单位为秒
    step: {
      type: Number,
      // 浏览器大约是60FPS，因此1s大约执行60次requestAnimationFrame,0.6的效果是最佳
      default: 0.6
    },
    // 是否要过渡色
    visibleGradient: {
      type: Boolean,
      // 浏览器大约是60FPS，因此1s大约执行60次requestAnimationFrame
      default: true
    },
    // 过渡的颜色
    lineGradientColor: {
      type: Array,
      default: () => [
        { percent: 0, color: '#FF9933' },
        { percent: 0.5, color: '#FF9933' },
        { percent: 1, color: '#FF4949' }
      ]
    }
  },
  data () {
    return {
      canvasObject: null,
      id: generateID()
    }
  },
  computed: {
    // width: canvas宽度/高度
    // outerRadius: 外围半径
    // pointRadius: 圆点半径
    // pointRadius: 圆环半径
    // width = 2 * outerRadius = 2 * (pointRadius + circleRadius)
    // 外围半径
    outerRadius () {
      return this.circleRadius + this.pointRadius
    },
    // canvas宽/高
    width () {
      return 2 * this.outerRadius + 'px'
    }
  },
  watch: {
    percentage (val, oldVal) {
      if (val >= 0 && val <= 100) {
        this.initCanvas()
      } else {
        throw new Error('进度百分比的范围必须在1~100内')
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.initCanvas()
    })
  },
  methods: {
    initCanvas () {
      const params = {
        id: `myCanvas-${this.id}`,
        x: this.outerRadius,
        y: this.outerRadius,
        radius: this.circleRadius,
        circleColor: this.circleColor,
        circleWidth: this.circleWidth,
        percentage: this.percentage,
        fontColor: this.fontColor,
        fontSize: this.fontSize,
        progressColor: this.progressColor,
        progressWidth: this.progressWidth,
        pointRadius: this.pointRadius,
        visiblePoint: this.visiblePoint,
        pointColor: this.pointColor,
        startDeg: this.startDeg,
        step: this.step,
        visibleGradient: this.visibleGradient,
        lineGradientColor: this.lineGradientColor
      }
      this.canvasObject = new CircleCanvas(params)
    }
  }
}
</script>
<style lang="scss" scoped>
canvas {
  zoom: 0.5;
}
</style>
