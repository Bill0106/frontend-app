const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.config');

const prodConfig = {
  mode: 'production',
  output: {
    publicPath: '//d30jecx7p602b2.cloudfront.net/static',
    filename: '[name].[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: (_, chunks) => ['vendors', ...chunks.map((item) => item.name)].join('~')
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      CONFIG_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({ chunkFilename: '[name].[contenthash:8].css' }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = merge(baseConfig, prodConfig);
