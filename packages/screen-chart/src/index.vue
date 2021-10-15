<template>
  <div class="screen-chart"
       style="width: 100%; height: 100%;"
       ref="screen-chart">
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'screen-chart',
  data () {
    return {
      observer: '',
      resizeObserver: '',
      recordOldValue: {
        width: '',
        height: ''
      },
      chart: ''
    }
  },
  mounted () {
    this.init()
    // this.initObserver()
    this.initResizeObserver()
  },
  methods: {
    // 图表初始化
    init () {
      const chart = echarts.init(this.$refs['screen-chart'])
      this.chart = chart
      this.$emit('initCb', chart)
    },
    initObserver () {
      // Mutationobserver 结果为导向，对一些尺寸变化的做不到监听
      const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      this.observer = new MutationObserver(mutationList => {
        console.log(mutationList)
        const width = getComputedStyle(this.$refs['screen-chart']).getPropertyValue('width')
        const height = getComputedStyle(this.$refs['screen-chart']).getPropertyValue('height')
        if (width === this.recordOldValue.width && height === this.recordOldValue.height) {
          return false
        }
        this.recordOldValue = Object.assign(this.recordOldValue, { width, height })
        if (this.chart) {
          this.chart.resize()
        }
      })
      this.observer.observe(this.$refs['screen-chart'], { attributes: true, attributeFilter: ['style'], attributeOldValue: true })
    },
    // ResizeOvserver 有兼容性问题
    initResizeObserver () {
      if (window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(() => {
          if (this.chart) {
            this.chart.resize()
          }
        })
        this.resizeObserver.observe(this.$refs['screen-chart'])
      }
    }
  },
  beforeDestroy () {
    if (this.observer) {
      this.observer.disconnect()
      this.observer.takeRecords()
      this.observer = null
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-chart {
  width: 100%;
  height: 100%;
}
</style>
