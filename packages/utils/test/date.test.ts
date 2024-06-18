import { expect, it } from 'vitest'
import { date, datePeriod, isDateExpired, timestamp, unixDiff } from '../src'

it('unix timestamp', () => {
  expect(date().unix()).toBe(timestamp())
})
it('date expired', () => {
  const startAt = date('2020-05-05').unix()
  const endAt = date('2020-05-15').unix()
  expect(isDateExpired(startAt, endAt, '5d')).toBe(true)
})
it('date not expired', () => {
  const startAt = date('2020-05-05').unix()
  const endAt = date('2020-05-10').unix()
  expect(isDateExpired(startAt, endAt, '10d')).toBe(false)
})
it('to 5 days', () => {
  const startAt = date('2020-05-05 12:00:00').unix()
  const endAt = date('2020-05-10 12:00:00').unix()
  expect(unixDiff(startAt, endAt)).toBe(5)
})

it('to zero days', () => {
  const startAt = date('2020-10-10').unix()
  const endAt = date('2020-05-05').unix()
  expect(unixDiff(startAt, endAt)).toBe(0)
})

it('date period', () => {
  const startAt = date('2020-10-10 12:00:00').unix()
  expect(datePeriod(startAt, 2, 'day')).toBe(date('2020-10-12 12:00:00').unix())
})

it('date period with default params', () => {
  const startAt = date('2020-10-10 12:00:00').unix()
  expect(datePeriod(startAt)).toBe(date('2020-11-10 12:00:00').unix())
})
