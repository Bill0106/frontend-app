const fs = require('fs')
const rimraf = require('rimraf')
const ora = require('ora')
const qiniu = require('qiniu')
const dist = 'dist/'

const build = () => {
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.prod')
  const complier = webpack(webpackConfig)
  const spinner = ora('building for production ...')
  spinner.start()

  return new Promise((resolve, reject) => {
    fs.mkdir(dist, err => {
      if (err) reject(err)
      complier.run((error, stats) => {
        spinner.stop()
        if (error) reject(error)
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n')
        resolve()
      })
    })
  })
}

const uploadFile = (file) => {
  const versions = JSON.parse(fs.readFileSync(dist + 'manifest.json').toString())
  const fileName = versions[file]
  const bucket = 'website'
  const putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + fileName)
  const extra = new qiniu.io.PutExtra()

  return new Promise((resolve, reject) => {
    qiniu.io.putFile(putPolicy.token(), fileName, dist + fileName, extra, (error, ret) => {
      if (error) reject(error)
      resolve(ret)
    })
  })
}

const upload = () => {
  const QINIU = require('./config')
  const spinner = ora('uploading files ...')
  spinner.start()

  qiniu.conf.ACCESS_KEY = QINIU.AK
  qiniu.conf.SECRET_KEY = QINIU.SK

  Promise.all([uploadFile('app.js'), uploadFile('app-vendor.js'), uploadFile('app-meta.js')])
    .then(values => console.log(values))
    .catch(error => {
      throw error
    })
  spinner.stop()
}

rimraf(dist, err => {
  if (err) throw err
  build().then(() => {
    upload()
    console.log('All Finish!')
  })
})
