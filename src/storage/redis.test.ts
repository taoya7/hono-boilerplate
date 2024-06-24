import { describe, expect, it } from 'vitest'
import RedisAdapter from './redis'

describe('redisAdapter', () => {
  it('ping redis', async () => {
    const res = await RedisAdapter.defaultClient.ping()
    expect(res).toBe('PONG')
  })
  it('set and get key', async () => {
    const key = 'test'
    const value = 'test'
    await RedisAdapter.defaultClient.set(key, value, () => {
    })
    const res = await RedisAdapter.defaultClient.get(key)
    expect(res).toBe(value)
  })
})
