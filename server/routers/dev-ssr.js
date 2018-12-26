const path = require('path')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const serverConfig = require('../../build/webpack.config.server')
const MemoryFS = require('memory-fs')
const mfs = new MemoryFS()
const serverCompiler = webpack(serverConfig)

serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err,stats)=>{
  if(err){
    throw err
    return
  }

  stats.errors.forEach((err)=>console.log(err))
  stats.warnings.forEach(warn=>console.log(warn))

  const bundlePath = path.join(serverConfig,'vue-ssr-server-bundle.json')

  bundle = JSON.parse(mfs.readFileSync(bundlePath,'utf-8'))
})


const handleSSR = async ctx=>{
  if (!bundle) {
    ctx.body = '请稍等。。。'
    return
  }

  const clientManifestResp = await axios.get('http://127.0.0.1:8000/vue-ssr-client-manifest.json')

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs')

  const renderer = VueServerRenderer.createBundleRenderer(bundle,{
    inject:false,
    clientManifest
  })
}


// const path = require('path')
// const webpack = require('webpack')
// const MemoryFS = require('memory-fs')
// const fs = require('fs')
// const VueServerRenderer = require('vue-server-renderer')
// const serverConfig = require('../../build/webpack.config.server')
// const serverCompiler = webpack(serverConfig)
// const mfs = new MemoryFS()
// serverCompiler.outputFileSystem = mfs
//
// let bundle
// serverCompiler.watch({},(err,stats) => {
//   if(err) throw err
//   stats = stats.toJson()
//   stats.error.forEach((err)=>console.log(err))
//   stats.warning.forEach((warn)=>console.log(warn))
//
//   const bundlePath = path.join(serverConfig.output.filename, 'vue-ssr-server-bundle.json')
//   bundle = JSON.parse(mfs.readFileSync((bundlePath,'utf-8')))
// })
//
// const handleSSR = async (ctx) => {
//   if (!bundle) {
//     ctx.body = '别着急，稍等一会'
//     return
//   }
//
//   const clientManifestResp = await axios.get('http://127.0.0.1:8000/vue-ssr-client-manifest.json')
//
//   const clientManifest = clientManifestResp.data
//
//   const template = fs.readFileSync (path.join(__dirname,'../server.template.ejs'))
//
//   const renderer = VueServerRenderer.createBundleRenderer(bundle,{
//     inject: false,
//     clientManifest
//   })
// }