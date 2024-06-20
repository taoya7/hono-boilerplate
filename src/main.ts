import { serve } from '@hono/node-server'
import logger from '@/utils/logger'
import app from '@/app'
import { config } from '@/config'
import { getLocalhostAddress } from './utils/common'

const { PORT, HOST, APP_DOMAIN, swaggerEnable } = config

const hostIPList = getLocalhostAddress();

logger.info(`🎉 Server is running on port ${PORT} 📢`)
if (config.listenInaddrAny) {
  for (const ip of hostIPList) {
      logger.info(`🔗 Network: 👉 http://${ip}:${PORT}`);
  }
}
swaggerEnable && logger.info(`🔗 Swagger:  👉 ${APP_DOMAIN}/api/doc.html`)
const server = serve({
  fetch: app.fetch,
  hostname: HOST,
  port: PORT,
})

export default server
