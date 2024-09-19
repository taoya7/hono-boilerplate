import { OpenAPIHono } from '@hono/zod-openapi'
import { compress } from 'hono/compress'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash' // https://hono.dev/middleware/builtin/trailing-slash
import { swaggerUI } from '@hono/swagger-ui'
import { Context, Hono } from 'hono'
import { cors } from 'hono/cors'

import { showRoutes } from 'hono/dev'
import registry from './registry'
import RedisAdapter from './storage/redis'
import { notFoundHandler } from '@/common/errors'
import Logger from '@/logging/logger'
import { setup } from '@/core/setup'
import { config } from '@/config'
import apis from '@/routes/api'

const app = new Hono()
const api = new OpenAPIHono({ strict: true })

setup(app)
app.route('/', registry)
// swagger
api.doc31('/api/api-spec', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: '',
    description: '',
  },
}).get('/doc.html', swaggerUI({ url: '/api/api-spec' }))
// end swagger
api.route('/api', apis)
app.get('/_health', async (ctx: Context) => {
  try {
    await RedisAdapter.defaultClient.ping()
  }
  catch (err: any) {
    Logger.error('Redis ping failed', err)
    return
  }
  return ctx.json({
    status: 'ok',
  })
})
app.use(trimTrailingSlash())
app.use(compress())
app.use(csrf())
// 预防csrf攻击
api.use('*', cors())
app.notFound(notFoundHandler)
if (config.server.showRoutes) {
  console.log('app')
  showRoutes(app)
  console.log('api')
  showRoutes(api)
}
app.route('', api)
export default app
