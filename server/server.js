const Koa = require('koa')
const app = new Koa()
const isDev = process.env.NODE_ENV === 'development'
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    switch (isDev) {
      case true:
        ctx.body = err.message
        break
      case false:
        ctx.body = 'please try again later'
        break
    }
  }
})
