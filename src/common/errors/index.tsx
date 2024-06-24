import type { ErrorHandler, NotFoundHandler } from 'hono'
import NotFoundError from './types/not-found'
import { config } from '@/config'
import Logger from '@/logging/logger'
import Error from '@/views/error'

/**
 * 异常处理
 * 正式环境: 返回JSON
 * 开发环境: 返回Html
 */
export const errorHandler: ErrorHandler = (error, ctx) => {
  const requestPath = ctx.req.path
  let errorMessage = process.env.NODE_ENV === 'production' ? error.message : error.stack || error.message
  switch (error.constructor.name) {
    case 'NotFoundError':
      ctx.status(404)
      errorMessage += 'The route does not exist or has been deleted.'
      break
  }
  const message = `${error.name}: ${errorMessage}`
  Logger.error(`Error in ${requestPath}: ${message}`, error)
  return config.ENV === 'production'
    ? ctx.json({
      error: {
        message: error.message ?? error,
      },
    })
    : ctx.html(<Error requestPath={requestPath} message={message} errorRoute="" nodeVersion={process.version} />)
}

export const notFoundHandler: NotFoundHandler = ctx => errorHandler(new NotFoundError(), ctx)
