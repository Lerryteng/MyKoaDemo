const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

const Router = require('koa-router')

let home = new Router()

// 子路由1
home.get('/', async ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

// 子路由2
let page1 = new Router()
page1.get('/404', async ( ctx )=>{
  ctx.body = '404 page!'
})

let page2 = new Router()
page2.get('/helloworld', async ( ctx )=>{
    ctx.response.type = 'json';
    ctx.body = {data: 'helloworld page!'}
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page1.routes(), page1.allowedMethods())
router.use('/page', page2.routes(), page2.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})