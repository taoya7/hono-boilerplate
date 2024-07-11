import { Context, Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import robotstxt from '@/routes/robots.txt'

const app = new Hono()
// 首页
app.get('/', (ctx: Context) => {
  return ctx.json({
    message: 'Hello World🌍',
  })
})
app.get('/robots.txt', robotstxt)
// 静态资源处理
app.use(
  '/*',
  serveStatic({
    root: './src/assets',
    rewriteRequestPath: path => (path === '/favicon.ico' ? '/favicon.png' : path),
  }),
)
export default app
