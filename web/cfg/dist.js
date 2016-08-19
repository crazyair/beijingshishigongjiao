'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let HtmlWebpackPlugin = require('html-webpack-plugin');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].[hash:8].js',
    publicPath: '/assets/'
  },
  entry:{
    app:path.join(__dirname, '../src/index'),
    vendor:['react','react-dom','react-router','lodash','axios','react-storage']
  },
  cache: false,
  // devtool: 'sourcemap',
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      title:'北京实时公交查询',
      filename:'../index.html',
      template:'./src/sources/tpl.html'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),// ('vendor','vendor.[hash:8].js')  可以加上hash
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
