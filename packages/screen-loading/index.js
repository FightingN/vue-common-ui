import screenLoading from './src'

screenLoading.install = function (Vue) {
  Vue.component(screenLoading.name, screenLoading)
}

export default screenLoading
