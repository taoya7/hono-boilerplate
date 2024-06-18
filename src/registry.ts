import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import index from '@/routes/index'
import robotstxt from '@/routes/robots.txt'

const app = new Hono()
app.get('/', index)
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
