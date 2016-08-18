'use strict';

var path = require('path');
var webpack = require('webpack');

var baseConfig = require('./base');
var defaultSettings = require('./defaults');

// Add needed plugins here
var BowerWebpackPlugin = require('bower-webpack-plugin');

var config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  // devtool: 'sourcemap',
  devtool: false,
  plugins: [new webpack.optimize.DedupePlugin(), new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }), new BowerWebpackPlugin({
    searchResolveModulesDirectories: false
  }), new webpack.optimize.UglifyJsPlugin(), new webpack.optimize.OccurenceOrderPlugin(), new webpack.optimize.AggressiveMergingPlugin(), new webpack.NoErrorsPlugin()],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(config.additionalPaths, [path.join(__dirname, '/../src')])
});

module.exports = config;

//# sourceMappingURL=dist-compiled.js.map