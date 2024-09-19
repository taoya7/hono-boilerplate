import { serve } from '@hono/node-server'
import { getLocalhostAddress } from './utils/common'
import Logger from '@/logging/logger'
import { config } from '@/config'
import app from '@/app'

const { APP_DOMAIN } = config
const hostIPList = getLocalhostAddress()
Logger.info('lifecycle', `🎉 Server is running on port ${config.server.port} 📢`)
if (config.listenInaddrAny) {
  for (const ip of hostIPList) {
    Logger.info('lifecycle', `🔗 Network: 👉 http://${ip}:${config.server.port}`)
  }
}
config.server.swagger.enable && Logger.info('lifecycle', `🔗 Swagger:  👉 ${APP_DOMAIN}/doc.html`)
serve({
  fetch: app.fetch,
  hostname: config.server.host,
  port: config.server.port,
})
