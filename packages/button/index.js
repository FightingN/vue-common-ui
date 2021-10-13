// index.js是整个packages的主js文件，负责导入所有的组件
import CoButton from './src/button.vue'

CoButton.install = function(Vue) {
  // 注册组件 第一个参数是组件名,第二个参数传入组件
  Vue.component(CoButton.name, CoButton)
}

export default CoButton
