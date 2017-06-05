// NOTE (cw|6.4.2017) we were using this config with mocha-webpack in order to process
// our tests (written in ES6) before running them. However, since we *need* to be running
// all our tests in the browser using Karma, we don't need this configuration most likely.

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










