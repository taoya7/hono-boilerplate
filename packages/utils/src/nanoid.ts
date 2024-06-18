import { nanoid as _nanoid, customAlphabet } from 'nanoid'

/**
 * 一个小巧、安全、URL友好、唯一的 JavaScript 字符串ID生成器
 */
const NANOID_ALPHABET
  = 'Qyz2FVvSpCjFN6Ym7Q3RYF'

export function nanoid(len = 21): string {
  return nanoidCustomAlphabet(NANOID_ALPHABET, len)
}

export function nanoidCustomAlphabet(alphabet: string, len = 21): string {
  const generate = customAlphabet(alphabet, len)
  return generate()
}
/**
 * 获取nanoid
 */
export function getNanoid() {
  return _nanoid
}
