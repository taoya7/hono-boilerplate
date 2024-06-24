import { expect, it } from 'vitest'
import {
  addColorAlpha,
  alpha,
  darken,
  hexToRgb,
  invert,
  isDarkColor,
  isLightColor,
  lighten,
  mixColor,
  rgbToHex,
} from '../src'

it('addColorAlpha(添加颜色透明度)', () => {
  expect(addColorAlpha('#ffffff', 0.2)).toEqual('rgba(255, 255, 255, 0.2)')
})
it('混合颜色', () => {
  const color = mixColor('#ffffff', '#000000', 0.5)
})

it('invalid hex', () => {
  expect(hexToRgb('invalid')).toStrictEqual([])
})

it('rgba(255,255, 255, 0.1) to rgb', () => {
  expect(hexToRgb('rgba(255,255,255,0.1)')).toStrictEqual([255, 255, 255, 0.1])
})

it('rgb(255,255,255) to rgb', () => {
  expect(hexToRgb('rgb(255,255, 255)')).toStrictEqual([255, 255, 255, 1])
})

it('#800080 to rgb', () => {
  expect(hexToRgb('#80008080')).toStrictEqual([128, 0, 128, 0.5])
})

it('#fff to rgb', () => {
  expect(hexToRgb('#fff')).toStrictEqual([255, 255, 255, 1])
})

it('rgb(255, 255, 153) to hex', () => {
  expect(rgbToHex([255, 255, 153])).toStrictEqual('#ffff99')
})

it('rgb(17, 17, 123) to hex', () => {
  expect(rgbToHex([17, 17, 123])).toStrictEqual('#11117b')
})

it('alpha #fff', () => {
  expect(alpha('#fff', 0.5)).toBe('rgba(255, 255, 255, 0.5)')
})

it('alpha #000', () => {
  expect(alpha('#000', 0.1)).toBe('rgba(0, 0, 0, 0.1)')
})

it('alpha #EB5757', () => {
  expect(alpha('#EB5757', 0.1)).toBe('rgba(235, 87, 87, 0.1)')
})

it('lighten #000', () => {
  expect(lighten('#000', 0.1)).toBe('#1a1a1a')
})

it('darken #106bf3', () => {
  expect(darken('#106bf3', 0.1)).toBe('#0e60da')
})

it('darken #999', () => {
  expect(darken('#999', 0.5)).toBe('#4d4d4d')
})

it('#000 is dark color', () => {
  expect(isDarkColor('#000')).toBe(true)
})

it('helloworld is dark color', () => {
  expect(isDarkColor('helloworld')).toBe(true)
})

it('#106bf3 is dark color', () => {
  expect(isDarkColor('#106bf3')).toBe(true)
})

it('#000000F7 is dark color', () => {
  expect(isDarkColor('#000000F7')).toBe(true)
})

it('#ffff99 is light color', () => {
  expect(isLightColor('#ffff99')).toBe(true)
})

it('#fff is light color', () => {
  expect(isLightColor('#fff')).toBe(true)
})

it('invert #000 to #ffffff', () => {
  expect(invert('#000')).toBe('#ffffff')
})

it('invert #ffff99 to #000066', () => {
  expect(invert('#ffff99')).toBe('#000066')
})

it('invert #106bf3 to #ef940c', () => {
  expect(invert('#106bf3')).toBe('#ef940c')
})

it('invert #fff to #000000', () => {
  expect(invert('#fff')).toBe('#000000')
})
