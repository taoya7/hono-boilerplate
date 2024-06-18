import type { Handler } from 'hono'
import Index from '@/views/index'

const handler: Handler = (ctx) => {
  ctx.header('Cache-Control', 'no-cache')
  return ctx.html(<Index />)
}

export default handler
