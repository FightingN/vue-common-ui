<template>
  <div class="screen-water-ripple">
    <canvas :width="width" :height="height" :id="`myCanvas${id}`"></canvas>
  </div>
</template>

<script>
import WaterRipple from './WaterRipple'
import { generateID } from 'src/utils/common'
export default {
  name: 'screen-water-ripple',
  props: {
    width: {
      type: String,
      default: '300px'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      id: generateID()
    }
  },
  created () {
    this.$nextTick(() => {
      this.initCanvas()
    })
  },

  methods: {
    initCanvas () {
      const params = {
        id: `myCanvas${this.id}`
      }
      new WaterRipple(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.screen-water-ripple {
  canvas {
    border: 1px solid red;
  }
}
</style>
