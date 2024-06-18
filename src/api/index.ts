import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'

const app = new OpenAPIHono()

app.get('/doc.html', swaggerUI({ url: '/api/docs' }))

const docs = app.getOpenAPI31Document({
  openapi: '3.1.0',
  info: {
    version: '0.0.1',
    title: 'API Doc',
  },
})
app.get('/docs', ctx => ctx.json(docs))

export default app
