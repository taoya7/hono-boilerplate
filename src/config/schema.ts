import { z } from 'zod'

export const configSchema = z.object({
  __dirname: z.string().default('/'),
  ENV: z.enum(['development', 'test', 'production']).default('development').describe('运行环境'),
  APP_DOMAIN: z.string().default('http://127.0.0.1:3000').describe('APP_DOMAIN'),
  server: z.object({
    host: z.string().default('0.0.0.0').describe('HOST'),
    port: z.coerce.number().default(3000).describe('PORT'),
    showRoutes: z.boolean().default(false).describe('是否显示路由信息'),
    swagger: z.object({
      enable: z.coerce.boolean().default(true).describe('是否启用swagger文档'),
    }),
    seo: z.object({
      allowRobot: z.boolean().default(true).describe('是否禁止搜索引擎爬取'),
    }),
    storage: z.object({
      uploadMaxSize: z.number().default(262144000).describe('文件上传最大限制'), // 250MB
    }),
  }),
  aws: z.object({
    accessKeyId: z.string().describe('AWS访问密钥ID'),
    secretAccessKey: z.string().describe('AWS密钥'),
    region: z.string().describe('AWS区域'),
    s3: z.object({
      accelerateUrl: z.string().nullable().optional().describe('S3加速URL'),
      uploadBucketUrl: z.string().describe('S3上传桶URL'),
      uploadBucketName: z.string().describe('S3上传桶名称'),
      forcePathStyle: z.boolean().default(true).describe('强制路径样式'),
      acl: z.string().default('private').describe('访问控制列表'),
    }),
  }),

  isProduction: z.boolean().default(false).describe('是否生产环境'),
  listenInaddrAny: z.coerce.boolean().default(true).describe('是否监听所有地址'),
  loggerLevel: z.string().default('info').describe('日志等级'),
  showLoggerTimestamp: z.coerce.boolean().default(true).describe('是否显示日志时间戳'),

  // mailer
  SMTP_NAME: z.string().optional().describe('发件人名称'),
  SMTP_HOST: z.string().optional().describe('SMTP服务器'),
  SMTP_PORT: z.coerce.number().optional().describe('SMTP端口'),
  SMTP_SECURE: z.coerce.boolean().optional().default(true).describe('SMTP是否启用SSL'),
  SMTP_USERNAME: z.string().optional().describe('SMTP用户名'),
  SMTP_PASSWORD: z.string().optional().describe('SMTP密码'),
  SMTP_TLS_CIPHERS: z.string().default('').optional().describe('TLS密码'),
  // redis
  REDIS_URL: z.string().describe('Redis连接地址'),
})
export type Config = z.infer<typeof configSchema>
