<template>
  <div class="screen-battery-charging"
       :style="{'--percent': percentWithSingle, '--color': color, '--width': width + 'px', '--widthNum': width}">
    <div class="battery">
      <div class="g-wave"></div>
      <div class="g-wave"></div>
      <div class="g-wave"></div>
      <div class="bg-opacity"></div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'screen-battery-charging',
  props: {
    percent: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#0bd5be'
    },
    width: {
      type: Number,
      default: 200
    }
  },
  computed: {
    percentWithSingle () {
      if (this.percent > 90) {
        return '90%'
      }
      return this.percent + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-battery-charging {
  position: relative;
  width: var(--width);
  height: var(--width);
  // border: 1px solid var(--color);
  border-radius: 50%;
  .battery {
    position: absolute;
    top: 0px;
    left: 0px;
    width: var(--width);
    height: var(--width);
    // height: calc(var(--width) - 20px);
    // width: calc(var(--width) - 20px);
    z-index: 10;
    border-radius: 50%;
    overflow: hidden;
    .g-wave {
      position: absolute;
      width: 500px;
      height: 500px;
      background: #fff;
      border-radius: 45% 47% 44% 42%;
      top: calc(100% - var(--percent));
      left: 50%;
      transform: translate(-50%, 0px);
      z-index: 1;
      background: var(--color);
      opacity: 0.5;
      // animation: move 4s linear forwards;
      animation: move-forever 10s linear infinite;
    }
    .g-wave:nth-child(2) {
      border-radius: 38% 46% 43% 47%;
      transform: translate(-50%, 0px) rotate(200deg);
    }
    .g-wave:nth-child(3) {
      border-radius: 42% 46% 37% 40%;
      transform: translate(-50%, 0px) rotate(-200deg);
    }
    @keyframes move {
      0% {
        top: 100%;
      }
      100% {
        top: calc(100% - var(--percent));
        transform: translate(-50%, 0px) rotate(360deg);
      }
    }
    .bg-opacity {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: var(--color);
      opacity: 0.1;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 30;
  }
}
</style>

<style lang="scss">
.screen-battery-charing {
  @keyframes move-forever {
    100% {
      top: calc(100% - var(--percent));
      transform: translate(-50%, 0px) rotate(720deg);
      box-shadow: 0 14px 28px rgba(4, 188, 213, 0.2),
        0 10px 10px rgba(9, 188, 215, 0.08);
    }
  }
}
</style>
