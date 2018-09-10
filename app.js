const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./router/router')

app.use(bodyParser())

// logger
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${ctx.request.header['user-agent']} - ${rt}`)
})

app
  .use(router.routes())
  .use(router.allowedMethods())

var server = app.listen(3000, () => {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
