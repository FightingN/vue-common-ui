import CoButton from './button'
import CoTable from './co-table'
const components = [CoButton, CoTable]

const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  CoButton,
  CoTable
}
