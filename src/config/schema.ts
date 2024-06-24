import { z } from 'zod'

export const configSchema = z.object({
  ENV: z.enum(['development', 'test', 'production']).default('development').describe('运行环境'),
  HOST: z.string().default('0.0.0.0').describe('HOST'),
  PORT: z.coerce.number().default(3000).describe('PORT'),
  APP_DOMAIN: z.string().default('http://127.0.0.1:3000').describe('APP_DOMAIN'),

  isProduction: z.boolean().default(false).describe('是否生产环境'),
  listenInaddrAny: z.coerce.boolean().default(true).describe('是否监听所有地址'),
  loggerLevel: z.string().default('info').describe('日志等级'),
  showLoggerTimestamp: z.coerce.boolean().default(true).describe('是否显示日志时间戳'),
  // swagger
  swaggerEnable: z.coerce.boolean().default(true).describe('是否启用swagger'),
  // seo
  disallowRobot: z.coerce.boolean().default(true).describe('是否禁止搜索引擎爬取'),
  // mailer
  SMTP_NAME: z.string().optional().describe('发件人名称'),
  SMTP_HOST: z.string().optional().describe('SMTP服务器'),
  SMTP_PORT: z.coerce.number().optional().describe('SMTP端口'),
  SMTP_SECURE: z.coerce.boolean().optional().default(true).describe('SMTP是否启用SSL'),
  SMTP_USERNAME: z.string().optional().describe('SMTP用户名'),
  SMTP_PASSWORD: z.string().optional().describe('SMTP密码'),
  SMTP_TLS_CIPHERS: z.string().optional().describe('TLS密码'),
  // redis
  REDIS_URL: z.string().describe('Redis连接地址'),
})
export type Config = z.infer<typeof configSchema>
