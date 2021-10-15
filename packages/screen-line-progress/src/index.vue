<template>
  <div ref="main"
       class="screen-line-progress"
       :style="{'--width': width , '--height': height + 'px', '--bgColor': bgColor, '--activeColor': activeColor, '--borderRadius': borderRadius}">
    <div class="percent"
         :style="{width: current + 'px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'screen-line-progress',
  data () {
    return {
      current: 0,
      per: 0
    }
  },
  props: {
    step: {
      type: Number,
      default: 4
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: Number,
      default: 15
    },
    percent: {
      type: Number,
      default: 0
    },
    bgColor: {
      type: String,
      default: '#005555'
    },
    activeColor: {
      type: String,
      default: 'linear-gradient(to right, #006666, #00d099)'
    },
    borderRadius: {
      type: String,
      default: '0 7.5px 7.5px 0'
    }
  },
  watch: {
    percent: {
      immediate: true,
      handler: function (value) {
        if (value) {
          this.per = value
          this.$nextTick(() => {
            this.stepAnimation()
          })
        }
      }
    }
  },
  methods: {
    stepAnimation () {
      const width = this.$refs.main.clientWidth

      const target = width * (this.per / 100)
      let id
      if (this.current < target) {
        this.current += this.step
        id = requestAnimationFrame(() => {
          this.stepAnimation()
        })
      } else {
        cancelAnimationFrame(id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-line-progress {
  width: var(--width);
  height: var(--height);
  background: var(--bgColor);
  border-radius: var(--borderRadius);
  overflow: hidden;
  .percent {
    height: 100%;
    width: 0px;
    background: var(--activeColor);
    border-radius: 0 calc(var(--height) / 2) calc(var(--height) / 2) 0;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #fff;
      opacity: 0;
      width: 100%;
      height: 100%;
      border-radius: 0 calc(var(--height) / 2) calc(var(--height) / 2) 0;
      animation: move 2s ease-in-out infinite;
      animation-delay: 1s;
    }
  }

  @keyframes move {
    0% {
      opacity: 0.4;
      width: 0;
    }
    100% {
      opacity: 0.1;
      width: 100%;
    }
  }
}
</style>
