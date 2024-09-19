/**
 * 如果给定的字符串是 base64 编码的 URL，则返回匹配结果。
 *
 * @param url 要检查的 URL。
 * @returns 如果 URL 是 base64 编码的，则返回 RegExp 匹配结果，否则返回 false。
 */
export function isBase64Url(url: string) {
  const match = url.match(/^data:([a-z]+\/[^;]+);base64,(.*)/i)
  return match || false
}
