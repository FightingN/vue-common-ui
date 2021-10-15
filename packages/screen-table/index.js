import screenTable from './src'

screenTable.install = function (Vue) {
  Vue.component(screenTable.name, screenTable)
}

export default screenTable
