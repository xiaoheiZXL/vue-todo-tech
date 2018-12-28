const path = require('path')
const axios = require('axios')
const Router = require('koa-router')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const serverConfig = require('../../build/webpack.config.server')
const MemoryFS = require('memory-fs')
const mfs = new MemoryFS()
const fs = require('fs')
const serverCompiler = webpack(serverConfig)
const serverRender = require('./server-render')

serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  stats = stats.toJson()
  stats.errors.forEach((err) => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})


const handleSSR = async ctx => {
  if (!bundle) {
    ctx.body = '请稍等。。。'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json')

  const clientManifest = clientManifestResp.data

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
