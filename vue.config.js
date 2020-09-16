const isPro = process.env.NODE_ENV === 'production'
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 将文件拆分
const productionGzipExtensions = ['html', 'js', 'css'] // 需要拆分文件的类型
module.exports = {
  publicPath: isPro ? '/shop-admin/' : '/',
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        ws: false,
        target: 'http://localhost:8888/api/private/v1/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 移除 preload 插件
    config.plugins.delete('preload');
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })
  },
  configureWebpack: config => {
    // if (isPro) {
      // cdn引入
      // config.externals = {
      //   // 键值对: 键是你要cdn引用的插件名, 值是固定的, 只能百度
      //   'vue': 'Vue',
      //   'vuex': 'Vuex',
      //   'vue-router': 'VueRouter',
      //   'Axios': 'axios',
      //   'element-ui': 'ELEMENT',
      //   'echarts': 'echarts'
      // }
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      )
    // }
  },
  productionSourceMap: false
}
