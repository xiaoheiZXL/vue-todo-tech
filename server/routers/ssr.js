const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const VueServerRenderer = require('vue-server-renderer')
const clientManifest = require('../../public/vue-ssr-client-manifest')
const serverRender = require('./server-render')
const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)

const renderer = VueServerRenderer.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)

const pageRouter = new Router()

pageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = pageRouter
