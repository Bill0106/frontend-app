const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.dev')

const compiler = webpack(config)
compiler.apply()

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.publicPath,
  quiet: true,
  inline: true,
})
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

const historyApiFallback = require('connect-history-api-fallback')()
const port = 9000
const app = express()

app.use(historyApiFallback)
app.use(devMiddleware)
app.use(hotMiddleware)

app.listen(port, function(err) {
  if (err) {
    return console.error(err)
  }

  console.log('Listening at http://localhost:' + port + '/')
})
