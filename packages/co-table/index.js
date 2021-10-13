import CoTable from './src'

CoTable.install = function(Vue) {
  // 注册组件 第一个参数是组件名,第二个参数传入组件
  Vue.component(CoTable.name, CoTable)
}

export default CoTable
