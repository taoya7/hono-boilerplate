import winston from 'winston'
import { config } from '@/config'

const transports: (typeof winston.transports.File)[] = []
const logger = winston.createLogger({
  level: config.loggerLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.printf(info =>
      JSON.stringify({
        timestamp: info.timestamp,
        level: info.level,
        message: info.message,
      }),
    ),
  ),
  transports,
})
logger.add(new winston.transports.Console({
  format: winston.format.printf((info) => {
    const infoLevel = winston.format.colorize().colorize(info.level, config.showLoggerTimestamp ? `[${info.timestamp}] ${info.level}` : info.level)
    return `${infoLevel}: ${info.message}`
  }),
  silent: process.env.NODE_ENV === 'test',
}))

export default logger
