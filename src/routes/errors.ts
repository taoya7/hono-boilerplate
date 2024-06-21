import { Context, Hono } from 'hono'

const router = new Hono()

router.get('/test/error', (ctx: Context) => {
  return ctx.text('asd')
})

export default router
