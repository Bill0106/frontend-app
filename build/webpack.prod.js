const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.config');

const prodConfig = {
  mode: 'production',
  output: {
    publicPath: '//d30jecx7p602b2.cloudfront.net/',
    filename: '[name].[contentHash:8].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [new CleanWebpackPlugin()],
};

if (process.argv.includes('--analyse')) {
  prodConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseConfig, prodConfig);
