<template>
  <button class="co-button" :class="[type ? 'co-button--' + type : '']">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CoButton',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {}
  },
  mounted () {
    console.log('111', this.$slots)
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.co-button {
  display: inline-block;
  line-height: 1;
  min-height: 40px;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  &--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    &:hover {
      color: #fff;
      border-color: #66b1ff;
      background-color: #66b1ff;
    }
  }
}
</style>
