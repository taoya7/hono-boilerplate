import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

const router = new OpenAPIHono()
router.get('attachments.create', (c) => {
  return c.json({
    a: 123,
  })
})
router.openapi(
  createRoute({
    tags: ['docx-文档处理'],
    method: 'post',
    path: '/api/docx/countText',
    summary: '对文档的字数统计',
    // ...requestBody(
    //   z.object({
    //     url: z.string(),
    //   }),
    // ),
    responses: {
      200: {
        description: '成功返回',
        content: {
          'application/json': {
            schema: z.object({
              url: z.string(),
            }),
          },
        },
      },
    },
  }),
  async (c) => {
    return c.json({
      url: '',
    })
  },
)

export default router
