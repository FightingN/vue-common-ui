import screenMonthPicker from './src'

screenMonthPicker.install = function (Vue) {
  Vue.component(screenMonthPicker.name, screenMonthPicker)
}

export default screenMonthPicker
