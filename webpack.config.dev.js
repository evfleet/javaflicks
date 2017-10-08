/* eslint-disable no-unused-vars */
let path = require('path');
let webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/browser/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './dist/client'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'flow'],
            plugins: [
              'transform-object-rest-spread',
              'transform-decorators-legacy',
              'transform-class-properties',
              'transform-runtime'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    modules: ['./src/browser', './src/common', 'node_modules']
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
