import { Hono } from 'hono'
import { compress } from 'hono/compress'
import { trimTrailingSlash } from 'hono/trailing-slash' // https://hono.dev/middleware/builtin/trailing-slash
import registry from './registry'
import api from '@/api'
import { notFoundHandler } from '@/common/errors'

const app = new Hono()
app.route('/', registry)
app.route('/api', api)
app.use(trimTrailingSlash())
app.use(compress())
app.notFound(notFoundHandler)
export default app
