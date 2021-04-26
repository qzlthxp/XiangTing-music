const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  runtimeCompiler: false,
  productionSourceMap: !IS_PROD,
  parallel: require('os').cpus().length > 1,
  pwa: {},

  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)
  },
  productionSourceMap: false,
}
