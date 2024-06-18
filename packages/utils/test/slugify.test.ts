import { expect, it } from 'vitest'
import { slugify } from '../src'

it('slugify', () => {
  expect(slugify('/user/sign/in')).toBe('usersignin')
})
