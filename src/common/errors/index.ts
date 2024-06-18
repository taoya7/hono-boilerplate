import type { ErrorHandler, NotFoundHandler } from 'hono'

import NotFoundError from '@/types/not-found'
import logger from '@/utils/logger'

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
  logger.error(`Error in ${requestPath}: ${message}`)
  return ctx.json({
    error: {
      message: error.message ?? error,
    },
  })
}

export const notFoundHandler: NotFoundHandler = ctx => errorHandler(new NotFoundError(), ctx)
