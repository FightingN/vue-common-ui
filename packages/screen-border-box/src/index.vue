<template>
  <div class="screen-border-box"
       :style="{width: width, height: height, '--borderWidth': borderWidth, '--spanWidth': spanWidth, '--spanHeight': spanHeight, '--borderColor': borderColor, '--lineColor': lineColor}">
    <span class="row1"></span>
    <span class="row2"></span>
    <span class="col1"></span>
    <span class="col2"></span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'screen-border-box',
  props: {
    // box的宽度
    width: {
      type: String,
      default: '100%'
    },
    // box的高度
    height: {
      type: String,
      default: '100%'
    },
    // 边角的宽度
    borderWidth: {
      type: String,
      default: '3px'
    },
    // 边角的颜色
    borderColor: {
      type: String,
      default: '#29cdff'
    },
    // box边框的颜色
    lineColor: {
      type: String,
      default: '#005eb0'
    },
    // 边角的长度
    spanWidth: {
      type: String,
      default: '4px'
    },
    // 边角的高度
    spanHeight: {
      type: String,
      default: '4px'
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-border-box {
  position: relative;
  border: 1px solid var(--lineColor);
  box-sizing: border-box;
  span {
    position: absolute;
    padding: var(--spanHeight) var(--spanWidth);
  }
  .row1 {
    top: -2px;
    left: -2px;
    border-left: var(--borderWidth) solid var(--borderColor);
    border-top: var(--borderWidth) solid var(--borderColor);
  }
  .row2 {
    top: -2px;
    right: -2px;
    border-right: var(--borderWidth) solid var(--borderColor);
    border-top: var(--borderWidth) solid var(--borderColor);
  }
  .col1 {
    bottom: -2px;
    left: -2px;
    border-bottom: var(--borderWidth) solid var(--borderColor);
    border-left: var(--borderWidth) solid var(--borderColor);
  }
  .col2 {
    bottom: -2px;
    right: -2px;
    border-right: var(--borderWidth) solid var(--borderColor);
    border-bottom: var(--borderWidth) solid var(--borderColor);
  }
}
</style>
