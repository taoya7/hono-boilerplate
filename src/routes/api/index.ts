import { OpenAPIHono } from '@hono/zod-openapi'

const router = new OpenAPIHono()

router.route('/', router)

export default router
