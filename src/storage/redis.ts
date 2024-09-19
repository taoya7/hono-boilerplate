import { Buffer } from 'node:buffer'
import Redis, { RedisOptions } from 'ioredis'
import { defaults } from 'lodash-es'
import { config } from '@/config'
import Logger from '@/logging/logger'

type RedisAdapterOptions = RedisOptions & {
  connectionNameSuffix?: string
}

const defaultOptions: RedisOptions = {
  maxRetriesPerRequest: 20,
  enableReadyCheck: false,
  showFriendlyErrorStack: config.ENV === 'development',

  retryStrategy(times: number) {
    Logger.warn(`正在重试 Redis 连接：尝试 ${times} 次`)
    return Math.min(times * 100, 3000)
  },
  reconnectOnError(err) {
    return err.message.includes('READONLY')
  },
  // support Heroku Redis, see:
  // https://devcenter.heroku.com/articles/heroku-redis#ioredis-module
  tls: (config.REDIS_URL || '').startsWith('rediss://')
    ? {
        rejectUnauthorized: false,
      }
    : undefined,
}

export default class RedisAdapter extends Redis {
  constructor(
    url: string | undefined,
        { connectionNameSuffix, ...options }: RedisAdapterOptions = {},
  ) {
    /**
     * 用于调试。连接名称基于在此进程中运行的服务。
     * 注意，这个名称不需要是唯一的。
     */
    const connectionNamePrefix = config.ENV === 'development' ? process.pid : 'app'
    const connectionName = `${connectionNamePrefix}:${connectionNameSuffix ? `:${connectionNameSuffix}` : ''}`
    if (!url || !url.startsWith('ioredis://')) {
      super(
        config.REDIS_URL ?? '',
        defaults(options, { connectionName }, defaultOptions),
      )
    }
    else {
      let customOptions = {}
      try {
        const decodedString = Buffer.from(url.slice(10), 'base64').toString()
        customOptions = JSON.parse(decodedString)
      }
      catch (error) {
        throw new Error(`无法解码 Redis 适配器选项：${error}`)
      }
      try {
        super(
          defaults(options, { connectionName }, customOptions, defaultOptions),
        )
      }
      catch (error) {
        throw new Error(`初始化 Redis 客户端失败：${error}`)
      }
    }
    // More than the default of 10 listeners is expected for the amount of queues
    // we're running. Increase the max here to prevent a warning in the console:
    // https://github.com/OptimalBits/bull/issues/1192
    this.setMaxListeners(100)
  }

  private static client: RedisAdapter
  private static subscriber: RedisAdapter
  public static get defaultClient(): RedisAdapter {
    return (
      this.client
      || (this.client = new this(config.REDIS_URL, {
        connectionNameSuffix: 'client',
      }))
    )
  }

  public static get defaultSubscriber(): RedisAdapter {
    return (
      this.subscriber
      || (this.subscriber = new this(config.REDIS_URL, {
        maxRetriesPerRequest: null,
        connectionNameSuffix: 'subscriber',
      }))
    )
  }
}
