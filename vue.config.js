const isProduction = process.env.NODE_ENV === 'production'
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  // 部署应用时的基本 URL
  publicPath: isProduction ? './' : '/',
  // build时构建文件的目录，构建时传入 --no-clean 可关闭该行为
  outputDir: 'dist',
  // build时放置生成的静态资源（js、css、img、fonts）的（相对于outputDir的）目录
  assetsDir: '',
  // 指定生成的 index.html 的输出路劲（相对于outputDir）。也可以是一个绝对路劲。
  indexPath: 'index.html',
  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,
  // 是否启用eslint
  lintOnSave: !isProduction,
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/global.scss";'
      }
    }
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/sassmeister': {
        target: 'https://www.sassmeister.com',
        changeOrigin: true,
        pathRewrite: {
          '^/sassmeister': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.js',
        '@img': '@/assets/images',
        '@echarts': '@/components/ECharts'
      }
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript', 'css', 'scss', 'html', 'json']
      })
    ]
  }
}
