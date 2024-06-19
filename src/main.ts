import { serve } from '@hono/node-server'
import logger from '@/utils/logger'
import app from '@/app'
import { config } from '@/config'

const { PORT, HOST, APP_DOMAIN, swaggerEnable } = config
logger.info(`🎉 Server is running on port ${PORT}! Cheers!`)
logger.info(`🔗 Local: 👉 ${APP_DOMAIN}`)
swaggerEnable && logger.info(`🔗 Swagger:  👉 ${APP_DOMAIN}/api/doc.html`)
const server = serve({
  fetch: app.fetch,
  hostname: HOST,
  port: PORT,
})

export default server
