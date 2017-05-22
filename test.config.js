var prodConfig = require('./webpack.config')
var nodeExternals = require('webpack-node-externals')

module.exports = {
  resolve: prodConfig.resolve,
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'source-map',
  output: { // for sourcemap support
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  module: {
    loaders: prodConfig.module.loaders
  }
}










