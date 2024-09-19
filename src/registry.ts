import { Context, Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import robotstxt from '@/routes/robots.txt'
import FileStorage from '@/storage/files'

const app = new Hono()
// 首页
app.get('/', async (ctx: Context) => {
  const signedUrl = await FileStorage.getSignedUrl(`simple.pdf`)
  const upload = await FileStorage.getPresignedPost('simple.pdf', 'private')
  return ctx.json({
    message: 'Hello World🌍',
    signedUrl,
    upload,
  })
})
app.get('/robots.txt', robotstxt)
// 静态资源处理
app.use(
  '/*',
  serveStatic({
    root: './src/resources/assets',
    rewriteRequestPath: (path) => {
      return path
    },
  }),
)
export default app
