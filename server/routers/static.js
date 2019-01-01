const send = require('koa-send')
const Router = require('koa-router')

const staticRouter = new Router({prefix: '/public'})
staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})
module.exports = staticRouter
