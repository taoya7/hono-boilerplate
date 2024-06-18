import { expect, it } from 'vitest'
import { hs, ms } from '../src'

it('parse 5 seconds', () => {
  expect(hs('5s')).toBe(5)
})

it('parse 5 minutes', () => {
  expect(hs('5m')).toBe(5 * 60)
})

it('parse 5 hours', () => {
  expect(hs('5h')).toBe(5 * 60 * 60)
})

it('parse 1 day', () => {
  expect(hs('1d')).toBe(86400)
})

it('parse 5 weeks', () => {
  expect(hs('5w')).toBe(5 * 7 * 86400)
})

it('parse 5 years', () => {
  expect(hs('5y')).toBe(5 * 365 * 86400)
})

it('parse invalid foramt y5', () => {
  expect(hs('y5')).toBe(undefined)
})

it('parse invalid foramt 5-d', () => {
  expect(hs('5-d')).toBe(undefined)
})

it('parse invalid foramt 5dy', () => {
  expect(hs('5dy')).toBe(undefined)
})

it('parse invalid foramt m5d', () => {
  expect(hs('m5d')).toBe(undefined)
})

it('parse invalid foramt 5_000s', () => {
  expect(hs('5_000s')).toBe(undefined)
})

it('parse empty string', () => {
  expect(hs('  ')).toBe(undefined)
})

it('parse 5 seconds to ms', () => {
  expect(ms('5s')).toBe(5000)
})
