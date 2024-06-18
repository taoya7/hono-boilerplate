import { expect, it } from 'vitest'
import qs from '../src/qs'

const obj = {
  a: [1, 2, 3],
  b: 'hello',
  c: true,
  d: undefined,
}

const str = 'a=1,2,3&b=hello&c=true&d='

it('stringify object', () => {
  expect(qs.stringify(obj)).toBe(str)
})

it('parse string', () => {
  expect(qs.parse(str)).toStrictEqual({
    a: '1,2,3',
    b: 'hello',
    c: 'true',
    d: '',
  })
})

it('parse array', () => {
  expect(qs.parse([] as any)).toStrictEqual({})
})

it('parse empty string', () => {
  expect(qs.parse('')).toStrictEqual({})
})
