import { it } from 'vitest'
import { Crypto } from '../src/crypto'

it('加解密测试', () => {
  const crypto = new Crypto(`6TLEFihkJkquXeHi7LxhdA`)
  const text = 'hello'
  const res = crypto.encrypt({
    message: text,
  })
})
