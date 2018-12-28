const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const VueServerRenderer = require('vue-server-renderer')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')
const MemeryFS = require('memery-fs')
const serverCompiler = webpack(serverConfig)

const mfs = new MemeryFS()

serverCompiler.outputFIleSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileAsync(bundlePath, 'utf-8'))
})

const handleSSR = async (ctx) => {
  if (bundle) {
    const clientManifestResp = await axios.get(
      'http://127.0.0.1:8000/vue-ssr-client-demo-manifest.json'
    )
    const clientManifest = clientManifestResp.data
    const template = fs.readFileAsync(path.join(__dirname, '../server.template.ejs'))

    const renderer = VueServerRenderer.createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })
  } else {
    ctx.body = 'please wait ...'
    return
  }

}


// const Router = require('koa-router')
// const axios = require('axios')
// const MemeryFS = require('memery-fs')
// const webpack = require('webpack')
// const VueServerRenderer = require('vue-sever-renderer')
// const serverConfig = require('../../build/webpack.config.server')
// const serverCompiler = wepback(serverConfig)
// const mfs = new MemeryFS()
// serverCompiler.outputFileSystem = mfs

// let bundle
// serverCompiler.watch({}, (err, stats) => {
//   if (err) throw err
//   stats = stats.toJson()
//   stats.errors.forEach(err => console.log(err))
//   stats.warnings.forEach(warn => console.log(warn))
// })
