var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
	{
	    test: /\.js.*$/,
	    loaders: ['react-hot', 'babel'],
	    include: path.join(__dirname, 'src')
	},
	{
	    test: /\.css$/,
	    loader: 'style-loader!css-loader' 
	},
    ]
  },
  node: {
    fs: 'empty',
    tls: 'empty'
  }
};
