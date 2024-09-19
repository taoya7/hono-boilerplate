import nodeFetch, { RequestInit, Response } from 'node-fetch'

export type { RequestInit } from 'node-fetch'

/**
 * @param url 要获取的 URL
 * @param init fetch 初始化对象
 * @returns 响应结果
 */
export default async function fetch(
  url: string,
  init?: RequestInit,
): Promise<Response> {
  const fetchMethod = nodeFetch
  const response = await fetchMethod(url, {
    ...init,
  })
  return response
}
