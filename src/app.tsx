import { OpenAPIHono } from '@hono/zod-openapi'
import { compress } from 'hono/compress'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash' // https://hono.dev/middleware/builtin/trailing-slash
import { swaggerUI } from '@hono/swagger-ui'
import { Context } from 'hono'
import { cors } from 'hono/cors'

import registry from './registry'
import RedisAdapter from './storage/redis'
import { notFoundHandler } from '@/common/errors'
import { demoRouter } from '@/modules/demo/demo.router'
import errorsRouter from '@/routes/errors'
import Logger from '@/logging/logger'

const app = new OpenAPIHono({ strict: true })
app.route('/', registry)
app.route('/', demoRouter)
app.route('/', errorsRouter)
// swagger
app.doc31('/api/api-spec', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: '',
    description: '',
  },
})
  .get('/doc.html', swaggerUI({ url: '/api/api-spec' }))
// end swagger
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
app.use(cors())
app.notFound(notFoundHandler)
export default app
