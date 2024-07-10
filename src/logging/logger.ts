import { IncomingMessage } from 'node:http'
import winston from 'winston'
import ansis from 'ansis'
import { isArray, isEmpty, isObject, isString } from 'lodash-es'
import { config } from '@/config'

type LogCategory =
  | 'lifecycle'
  | 'authentication'
  | 'multiplayer'
  | 'http'
  | 'commands'
  | 'worker'
  | 'task'
  | 'processor'
  | 'email'
  | 'queue'
  | 'websockets'
  | 'database'
  | 'utils'
  | 'plugins'
type Extra = Record<string, any>

class Logger {
  output: winston.Logger
  public constructor() {
    this.output = winston.createLogger({
      level: [
        'error',
        'warn',
        'info',
        'http',
        'verbose',
        'debug',
        'silly',
      ].includes(config.loggerLevel)
        ? config.loggerLevel
        : 'info',
    })
    this.output.add(
      new winston.transports.Console({
        format: config.ENV === 'production'
          ? winston.format.json()
          : winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(
              ({ message, level, label, ...extra }) =>
                    `${level}:${
                      label ? ansis.bold(`[${label}] `) : ''
                    }${message} ${isEmpty(extra) ? '' : JSON.stringify(extra)}`,
            ),
          ),
      }),
    )
  }

  public info(label: LogCategory, message: string, extra?: Extra) {
    this.output.info(message, { ...this.sanitize(extra), label })
  }

  public debug(label: LogCategory, message: string, extra?: Extra) {
    this.output.debug(message, { ...this.sanitize(extra), label })
  }

  public warn(message: string, extra?: Extra) {
    if (config.isProduction) {
      this.output.warn(message, this.sanitize(extra))
    }
    else if (extra) {
      console.warn(message, extra)
    }
    else {
      console.warn(message)
    }
  }

  public error(
    message: string,
    error: Error,
    extra?: Extra,
    request?: IncomingMessage,
  ) {
    if (config.ENV === 'production') {
      this.output.error(message, {
        error: error.message,
        stack: error.stack,
      })
    }
    else {
      console.error(message)
      console.error(error)
      if (extra) {
        console.error(extra)
      }
    }
  }

  private sanitize = <T>(input: T, level = 0): T => {
    if (config.ENV === 'production') {
      return input
    }
    const sensitiveFields = [
      'accessToken',
      'refreshToken',
      'token',
      'password',
      'content',
    ]
    if (level > 3) {
      return '[…]' as any as T
    }
    if (isString(input)) {
      if (sensitiveFields.some(field => input.includes(field))) {
        return '[Filtered]' as any as T
      }
    }
    if (isArray(input)) {
      return input.map(this.sanitize) as any as T
    }
    if (isObject(input)) {
      const output = { ...input }
      for (const key of Object.keys(output)) {
        if (isObject(output[key])) {
          output[key] = this.sanitize(output[key], level + 1)
        }
        else if (isArray(output[key])) {
          output[key] = output[key].map((value: unknown) =>
            this.sanitize(value, level + 1),
          )
        }
        else if (sensitiveFields.includes(key)) {
          output[key] = '[Filtered]'
        }
        else {
          output[key] = this.sanitize(output[key], level + 1)
        }
      }
      return output
    }
    return input
  }
}

export default new Logger()
