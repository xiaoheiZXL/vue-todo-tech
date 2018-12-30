const path = require('path')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')
const MemoryFS = require('memory-fs')
const mfs = new MemoryFS()
const axios = require('axios')
const fs = require('fs')
const Router = require('koa-router')
const serverRender = require('./server-render')
const VueServerRenderer = require('vue-server-renderer')


const serverCompiler = webpack(serverConfig)

serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, async (err, stats) => {
  if (err) {
    throw err
    return
  }

  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  let bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))

})


let handleSSR = async ctx => {
  if (!bundle) {
    ctx.body = 'please wait ...'
    return
  }

  let clientManifestResp = await axios.get('http://127.0.0.1:8000/public/vue-ssr-client-manifest.json')

  let clientManifest = clientManifestResp.data

  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
