import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

export function demoController(api: OpenAPIHono) {
  api.openapi(
    createRoute({
      tags: ['Demo'],
      method: 'get',
      path: '/api/demo',
      responses: {
        200: {
          description: '演示接口',
          content: {
            'application/json': {
              schema: z.object({
                message: z.string(),
                code: z.number().default(1000),
                data: z.object({
                }),
              }),
            },
          },
        },
      },
    }),
    async (c) => {
      return c.json({
        message: 'demo',
        code: 1000,
        data: {},
      })
    },
  )
}
