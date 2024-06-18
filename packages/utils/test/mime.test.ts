import { expect, it } from 'vitest'
import { mime } from '../src'

it('image mime type', () => {
  expect(mime('.jpg')).toBe('image/jpeg')
  expect(mime('.mp3')).toBe('audio/mpeg')
})
