const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config');

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  cache: {
    type: 'filesystem'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: { javascriptEnabled: true },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ CONFIG_ENV: JSON.stringify('dev') }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 1234,
    hot: true,
    historyApiFallback: true,
  },
};

module.exports = merge(baseConfig, devConfig);
