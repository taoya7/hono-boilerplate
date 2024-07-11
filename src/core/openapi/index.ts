import { z } from 'zod'

export function requestBody(schema: z.ZodType) {
  return {
    request: {
      body: {
        content: {
          'application/json': {
            schema,
          },
        },
      },
    },
  }
}

export function json200Response(schema: z.ZodType, description: string) {
  return {
    200: {
      content: {
        'application/json': {
          schema,
        },
      },
      description,
    },
  }
}

export const json401Response = {
  401: {
    content: {
      'application/json': {
        schema: z.object({
          message: z.string(),
        }),
      },
    },
    description: 'Unauthorized',
  },
}
