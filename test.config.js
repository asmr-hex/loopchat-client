var prodConfig = require('./webpack.config')

module.exports = {
  resolve: prodConfig.resolve,
  target: 'node',
  devtool: 'source-map',
  output: { // for sourcemap support
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  module: {
    loaders: prodConfig.module.loaders
  }
}










