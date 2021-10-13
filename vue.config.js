const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  lintOnSave: true,
  // 扩展webpack配置,使packages加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add(resolve('packages'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
    config.resolve.alias
      .set('assets', resolve('examples/assets'))
      .set('components', resolve('examples/components'))
      .set('router', resolve('examples/router'))
      .set('store', resolve('examples/store'))
      .set('views', resolve('examples/views'))
      .set('utils', resolve('examples/utils'))
      .set('packages', resolve('packages'))
      .set('src', resolve('src'))
    // config.module.rule('md')
    //   .test(/\.md/)
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .end()
    //   .use('vue-markdown-loader')
    //   .loader('vue-markdown-loader/lib/markdown-compiler')
    //   .options({
    //     raw: true
    //   })
  }
}
