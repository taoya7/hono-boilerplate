import { OpenAPIHono } from '@hono/zod-openapi'
import { demoController } from './demo.controller'

export const demoRouter = new OpenAPIHono()
demoController(demoRouter);

