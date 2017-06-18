var webpack = require('webpack')
var ManifestPlugin = require('webpack-manifest-plugin')
var config = require('./webpack.base')

config.output.filename = '[name].[chunkhash:6].js'
config.output.chunkFilename = '[name].[chunkhash:6].js'

config.plugins = [
  new webpack.DefinePlugin({
    "process.env": { 
      NODE_ENV: JSON.stringify("production") 
    }
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'app-vendor',
    minChunks: function(module) {
      const userRequest  = module.userRequest
      if (typeof userRequest !== 'string') {
        return false
      }

      return userRequest.indexOf('node_modules') >= 0
    }
  }),

  new webpack.optimize.CommonsChunkPlugin({
    names: ['app-vendor', 'app-meta']
  }),

  new ManifestPlugin(),

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: true,
    sourceMap: true
  }),

  new webpack.LoaderOptionsPlugin({
    minimize: true
  })
]

module.exports = config
