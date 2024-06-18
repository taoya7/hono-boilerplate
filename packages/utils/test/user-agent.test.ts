import { expect, it } from 'vitest'
import { parseUserAgent } from '../src/user-agent'

it('parse ua', () => {
  expect(parseUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36')).toEqual({
    browser: {
      name: 'Chrome',
      version: '123.0.0.0',
    },
    os: {
      name: 'Windows',
      version: '10.0',
    },
    platform: {
      manufacturer: undefined,
      type: 'desktop',
      model: 'other',
    },
  })
})
