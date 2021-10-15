import screenDropdownMenu from './src'

screenDropdownMenu.install = function (Vue) {
  Vue.component(screenDropdownMenu.name, screenDropdownMenu)
}

export default screenDropdownMenu
