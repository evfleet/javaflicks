/* eslint-disable no-unused-vars */

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  context: __dirname,
  entry: {
    app: [
      './src/browser/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, './web'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    modules: ['./src/browser', 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Authentication',
      template: './src/browser/assets/templates/dev.ejs'
    }),
    new LiveReloadPlugin()
  ]
};
