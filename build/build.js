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

const uploadFile = (key, localFile) => {
  const bucket = 'website'
  const putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + key)
  const extra = new qiniu.io.PutExtra()

  return new Promise((resolve, reject) => {
    qiniu.io.putFile(putPolicy.token(), key, localFile, extra, (error, ret) => {
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

  const versions = JSON.parse(fs.readFileSync(dist + 'manifest.json').toString())
  const vendor = uploadFile(versions['app-vendor.js'], dist + versions['app-vendor.js'])
  const meta = uploadFile(versions['app-meta.js'], dist + versions['app-meta.js'])

  Promise.all([vendor, meta])
    .then(values => {
      console.log(values)
      console.log('All Finish!')
    })
    .catch(error => {
      throw error
    })
  spinner.stop()
}

rimraf(dist, err => {
  if (err) throw err
  build()
    .then(() => upload())
    .catch(err => {
      throw err
    })
})
