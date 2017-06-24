const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./webpack.base')

const hots = ['webpack-hot-middleware/client?noInfo=true&reload=true']

config.entry.app = hots.concat(config.entry.app)
config.output.filename = 'bundle.js'
config.output.publicPath = '/'

config.module.rules[0].use.push({ loader: '@angularclass/hmr-loader' })

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    template: 'index.html',
    inject: true
  })
]

module.exports = config
