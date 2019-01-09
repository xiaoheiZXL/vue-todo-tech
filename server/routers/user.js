const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'})

userRouter.post('/login', async ctx => {
  const userInfo = ctx.request.body
  if (userInfo.username === 'todoUser' && userInfo.password === 'todoUser') {
    ctx.session.userInfo = {
      username: 'todoUser'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'todoUser'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
