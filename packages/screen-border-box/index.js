import screenBorderBox from './src'

screenBorderBox.install = function (Vue) {
  Vue.component(screenBorderBox.name, screenBorderBox)
}

export default screenBorderBox
