import svgIcon from './src'

svgIcon.install = function (Vue) {
  Vue.component(svgIcon.name, svgIcon)
}

export default svgIcon
