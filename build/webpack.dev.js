const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: '/',
    filename: '[name].js',
  },
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.resolve(__dirname, '../', 'dist'),
    port: 1234,
    hot: true,
    inline: true,
  },
};

module.exports = merge(baseConfig, devConfig);
