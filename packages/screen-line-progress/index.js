import screenLineProgress from './src'

screenLineProgress.install = function (Vue) {
  Vue.component(screenLineProgress.name, screenLineProgress)
}

export default screenLineProgress
