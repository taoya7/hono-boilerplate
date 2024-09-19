import type { Handler } from 'hono'
import { config } from '@/config'

const handler: Handler = (ctx) => {
  if (config.server.seo.allowRobot) {
    return ctx.text('User-agent: *\nDisallow: /')
  }
  else {
    ctx.status(404)
    return ctx.text('')
  }
}

export default handler
