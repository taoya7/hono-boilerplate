import { z } from 'zod'

export const configSchema = z.object({
  ENV: z.enum(['development', 'test', 'production']).default('development').describe('运行环境'),
  HOST: z.string().default('127.0.0.1').describe('HOST'),
  PORT: z.coerce.number().default(3000).describe('PORT'),
  APP_DOMAIN: z.string().default('http://127.0.0.1:3000').describe('APP_DOMAIN'),

  listenInaddrAny: z.coerce.boolean().default(true).describe('是否监听所有地址'),
  loggerLevel: z.string().default('info').describe('日志等级'),
  showLoggerTimestamp: z.coerce.boolean().default(true).describe('是否显示日志时间戳'),
  // swagger
  swaggerEnable: z.coerce.boolean().default(true).describe('是否启用swagger'),
  // seo
  disallowRobot: z.coerce.boolean().default(true).describe('是否禁止搜索引擎爬取'),
})
export type Config = z.infer<typeof configSchema>
