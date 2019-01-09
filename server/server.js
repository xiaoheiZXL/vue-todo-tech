const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const koaSession = require('koa-session')
const send = require('koa-send')
const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')

const createDb = require('./db/db')
const appConfig = require('../app.config')

const db = createDb(appConfig.db.appId, appConfig.db.appKey)

app.use(koaBody())

app.use(async (ctx, next) => {
  ctx.db = db
  console.log(ctx.request)
  await next()
})

app.keys = ['vue-ssr-todo']

app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000
}, app))

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')})
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  try {
    console.log(`request start path with ${ctx.path} `)
    await next()
  } catch (err) {
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening to ${HOST}: ${PORT}`)
})
