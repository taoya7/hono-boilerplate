import { serve } from '@hono/node-server'
import { getLocalhostAddress } from './utils/common'
import Logger from '@/logging/logger'
import app from '@/app'
import { config } from '@/config'

const { PORT, HOST, APP_DOMAIN, swaggerEnable } = config

const hostIPList = getLocalhostAddress()

Logger.info('lifecycle', `🎉 Server is running on port ${PORT} 📢`)
if (config.listenInaddrAny) {
  for (const ip of hostIPList) {
    Logger.info('lifecycle', `🔗 Network: 👉 http://${ip}:${PORT}`)
  }
}
swaggerEnable && Logger.info('lifecycle', `🔗 Swagger:  👉 ${APP_DOMAIN}/doc.html`)
const server = serve({
  fetch: app.fetch,
  hostname: HOST,
  port: PORT,
})

export default server
