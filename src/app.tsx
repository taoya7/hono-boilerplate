import { OpenAPIHono } from '@hono/zod-openapi'
import { compress } from 'hono/compress'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash' // https://hono.dev/middleware/builtin/trailing-slash
import { swaggerUI } from '@hono/swagger-ui'
import registry from './registry'
import { notFoundHandler } from '@/common/errors'
import { demoRouter } from '@/modules/demo/demo.router'
import errorsRouter from '@/routes/errors'

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
app.use(trimTrailingSlash())
app.use(compress())
app.use(csrf())
app.notFound(notFoundHandler)
export default app
