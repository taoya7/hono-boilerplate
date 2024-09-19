import { Readable } from 'node:stream'
import { Blob, Buffer } from 'node:buffer'
import { PresignedPost } from '@aws-sdk/s3-presigned-post'
import { isBase64Url } from '@/utils/url'
import fetch, { RequestInit } from '@/utils/fetch'
import { config } from '@/config'
import Logger from '@/logging/logger'

export default abstract class BaseStorage {
  /** 签名 URL 过期的默认秒数。 */
  public static defaultSignedUrlExpires = 60
  /**
   * 返回用于向存储提供者上传文件的预签名 post。
   *
   * @param key 存储文件的路径
   * @param acl 使用的访问控制列表（ACL）
   * @param maxUploadSize 最大上传大小（字节）
   * @param contentType 文件的内容类型
   * @returns 用于客户端的预签名 post 对象（TODO: 从 S3 中抽象出来）
   */
  public abstract getPresignedPost(
    key: string,
    acl: string,
    maxUploadSize: number,
    contentType: string
  ): Promise<Partial<PresignedPost>>
  /**
   * Store a file in the storage provider.
   *
   * @param body The file body
   * @param contentLength The content length of the file
   * @param contentType The content type of the file
   * @param key The path to store the file at
   * @param acl The ACL to use
   * @returns The URL of the file
   */
  public abstract store({
    body,
    contentLength,
    contentType,
    key,
    acl,
  }: {
    body: Buffer | Uint8Array | Blob | string | Readable
    contentLength?: number
    contentType?: string
    key: string
    acl?: string
  }): Promise<string | undefined>
  /**
   * Returns a promise that resolves with a stream for reading a file from the storage provider.
   *
   * @param key The path to the file
   */
  public abstract getFileStream(
    key: string,
    range?: { start?: number, end?: number }
  ): Promise<NodeJS.ReadableStream | null>
  /**
   * Returns a file handle for a file from the storage provider.
   *
   * @param key The path to the file
   * @returns The file path and a cleanup function
   */
  public abstract getFileHandle(key: string): Promise<{
    path: string
    cleanup: () => Promise<void>
  }>
  /**
   * Returns a promise that resolves to a buffer of a file from the storage provider.
   *
   * @param key The path to the file
   * @returns A promise that resolves with the file buffer
   */
  public async getFileBuffer(key: string) {
    const stream = await this.getFileStream(key)
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = []
      if (!stream) {
        return reject(new Error('No stream available'))
      }

      stream.on('data', (d) => {
        chunks.push(d)
      })
      stream.once('end', () => {
        resolve(Buffer.concat(chunks))
      })
      stream.once('error', reject)
    })
  }

  /**
   * Upload a file to the storage provider directly from a remote or base64 encoded URL.
   *
   * @param url The URL to upload from
   * @param key The path to store the file at
   * @param acl The ACL to use
   * @param init Optional fetch options to use
   * @returns A promise that resolves when the file is uploaded
   */
  public async storeFromUrl(
    url: string,
    key: string,
    acl: string,
    init?: RequestInit,
  ): Promise<
    | {
      url: string
      contentType: string
      contentLength: number
    }
    | undefined
  > {
    const endpoint = this.getUploadUrl(true)

    // Early return if url is already uploaded to the storage provider
    if (url.startsWith('/api') || url.startsWith(endpoint)) {
      return
    }

    let buffer, contentType
    const match = isBase64Url(url)

    if (match) {
      contentType = match[1]
      buffer = Buffer.from(match[2], 'base64')
    }
    else {
      try {
        const res = await fetch(url, {
          follow: 3,
          redirect: 'follow',
          size: config.server.storage.uploadMaxSize,
          timeout: 10000,
          ...init,
        })

        if (!res.ok) {
          throw new Error(`Error fetching URL to upload: ${res.status}`)
        }
        buffer = await res.buffer()
        contentType
          = res.headers.get('content-type') ?? 'application/octet-stream'
      }
      catch (err) {
        Logger.warn('Error fetching URL to upload', {
          error: err.message,
          url,
          key,
          acl,
        })
        return
      }
    }

    const contentLength = buffer.byteLength
    if (contentLength === 0) {
      return
    }

    try {
      const result = await this.store({
        body: buffer,
        contentType,
        key,
        acl,
      })

      return result
        ? {
            url: result,
            contentLength,
            contentType,
          }
        : undefined
    }
    catch (err) {
      Logger.error('Error uploading to file storage from URL', err, {
        url,
        key,
        acl,
      })
    }
  }

  /**
   * 返回给定内容类型的内容处置方式。
   *
   * @param contentType 内容类型
   * @returns 内容处置方式
   */
  public getContentDisposition(contentType?: string) {
    if (contentType && this.safeInlineContentTypes.includes(contentType)) {
      return 'inline'
    }
    if (
      contentType
      && this.safeInlineContentPrefixes.some(prefix =>
        contentType.startsWith(prefix),
      )
    ) {
      return 'inline'
    }
    return 'attachment'
  }

  /**
   * 返回存储提供者的上传 URL。
   *
   * @param isServerUpload 上传是否在服务器上进行
   * @returns {string} 上传 URL
   */
  public abstract getUploadUrl(isServerUpload?: boolean): string
  /**
   * 返回给定文件的下载 URL。
   *
   * @param key 文件的路径
   * @returns {string} 文件的下载 URL
   */
  public abstract getUrlForKey(key: string): string
  /**
   * 从存储提供者获取文件的签名 URL。
   *
   * @param key 文件的路径
   * @param expiresIn 可选的 URL 过期秒数
   */
  public abstract getSignedUrl(
    key: string,
    expiresIn?: number
  ): Promise<string>

  /**
   * 从存储提供者删除文件。
   * @param key 文件的路径
   * @returns 一个在文件被删除时解析的 Promise
   */
  public abstract deleteFile(key: string): Promise<void>

  /**
   * 被认为可以安全地在浏览器中内联显示的内容类型列表。注意，
   * SVG 被特意排除在外，因为它们可能包含 JavaScript。
   */
  protected safeInlineContentTypes = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp',
  ]

  /**
   * 被认为可以安全地在浏览器中内联显示的内容类型前缀列表。
   */
  protected safeInlineContentPrefixes = ['video/', 'audio/']
}
