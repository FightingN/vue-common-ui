import screenChart from './src'

screenChart.install = function (Vue) {
  Vue.component(screenChart.name, screenChart)
}

export default screenChart
