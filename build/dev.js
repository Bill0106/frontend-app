const path = require('path')
const express = require('express')
const proxy = require('express-http-proxy')
const webpack = require('webpack')
const config = require('./webpack.dev')
const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')
const dashboard = new Dashboard()

const compiler = webpack(config)
compiler.apply(new DashboardPlugin(dashboard.setData))

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
app.use('/api/*', proxy('http://localhost:9999/api', {
  forwardPath: function (req, res) {
    return req.originalUrl
  }
}))

app.listen(port, function(err) {
  if (err) {
    return console.error(err)
  }

  console.log('Listening at http://localhost:' + port + '/')
})
