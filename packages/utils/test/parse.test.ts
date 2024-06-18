import { z } from 'zod'
import { expect, it } from 'vitest'
import { errorsToString } from '../src/parse'

it('errorsToString', () => {
  const registerSchema = z.object({
    name: z.string().min(3),
  })
  const result = registerSchema.safeParse({
    name: 'Jo',
  })
  if (!result.success) {
    const res = errorsToString(result.error.errors)
    expect(res).toBe('name: String must contain at least 3 character(s)')
  }
})
