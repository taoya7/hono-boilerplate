import moment from 'moment'
import type { unitOfTime } from 'moment'
import { hs } from './hs'

export function timestamp(): number {
  return Math.floor(Date.now() / 1e3)
}
export function date(str?: string, format?: string) {
  return moment(str, format)
}
export function unixDate(t: number) {
  return moment.unix(t)
}

/**
 * Check if the date is expired
 * @param start 
 * @param end 
 * @param expire expire time 对比时间的单位
 */
export function isDateExpired(
  start: number,
  end: number,
  expire: string,
): boolean {
  return end - start > hs(expire)!
}

/**
 * 时间Diff
 * @param start
 * @param end
 * @param unit 默认返回天数
 * @returns 默认返回天数
 */
export function unixDiff(
  start: number,
  end: number,
  unit: unitOfTime.Base | unitOfTime.Base = 'day',
): number {
  if (start > end || start < 0 || end < 0)
    return 0

  return unixDate(end).diff(unixDate(start), unit)
}
/**
 * Get the date period
 * @param start start date
 * @param value value
 * @param unit unit
 */
export function datePeriod(
  start: number,
  value = 1,
  unit: unitOfTime.Base = 'month',
): number {
  return unixDate(start)
    .add(value, unit as unknown as any)
    .unix()
}
