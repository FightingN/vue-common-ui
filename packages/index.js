import CoButton from './button'
import CoTable from './co-table'
import screenLoading from './screen-loading/src'
import screenBorderBox from './screen-border-box/src'
import screenCircleProgress from './screen-circle-progress/src'
import screenLineProgrress from './screen-line-progress'
import screenBatteryCharging from './screen-battery-charging'
import screenTable from './screen-table'
import screenChart from './screen-chart'
import screenMonthPicker from './screen-month-picker'
import screenDropdownMenu from './screen-dropdown-menu'
import screenCircleCanvas from './screen-circle-canvas'
import svgIcon from './svg-icon'
const components = [
  CoButton,
  CoTable,
  screenLoading,
  screenBorderBox,
  screenCircleProgress,
  screenLineProgrress,
  screenBatteryCharging,
  screenTable,
  screenChart,
  screenMonthPicker,
  screenDropdownMenu,
  screenCircleCanvas,
  svgIcon
]

const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('packages/svg-icon/src/svg', false, /\.svg$/)
requireAll(req)
export default {
  install,
  CoButton,
  CoTable,
  screenLoading,
  screenBorderBox,
  screenCircleProgress,
  screenLineProgrress,
  screenBatteryCharging,
  screenTable,
  screenChart,
  screenMonthPicker,
  screenDropdownMenu,
  svgIcon
}
