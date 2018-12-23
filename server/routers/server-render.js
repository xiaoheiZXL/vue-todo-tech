const ejs = require('ejs')
module.exports = async (ctx, renderer, template) => {
  ctx.headers['ContentType'] = 'text/html'
  const context = { url: ctx.path }
  try {
    const appString = await renderer.bundleRenderer.renderToString(context)
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })
    ctx.body = html
  } catch (err) {
    console.log(err)
    throw err
  }
}
