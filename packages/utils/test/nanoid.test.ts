import { expect, it } from 'vitest'
import { getNanoid, nanoid } from '../src/nanoid'

it('生成随机数', () => {
  expect(nanoid().length).toBe(21)
})
it('nanoid随机21', () => {
  const nanoid = getNanoid()
})
