import screenCircleCanvas from './src'

screenCircleCanvas.install = function(Vue) {
  Vue.component(screenCircleCanvas.name, screenCircleCanvas)
}

export default screenCircleCanvas
