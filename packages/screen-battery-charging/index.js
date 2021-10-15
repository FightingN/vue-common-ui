import screenBatteryCharging from './src'

screenBatteryCharging.install = function (Vue) {
  Vue.component(screenBatteryCharging.name, screenBatteryCharging)
}

export default screenBatteryCharging
