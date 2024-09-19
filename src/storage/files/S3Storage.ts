import OSS from 'ali-oss'
import BaseStorage from './BaseStorage'
import { config } from '@/config'

export default class AliOSSStorage extends BaseStorage {
  private client: OSS
  public expires: number
  constructor() {
    super()
    this.expires = 60// 秒
    this.client = new OSS({
      region: config.aws.region,
      accessKeyId: config.aws.accessKeyId,
      accessKeySecret: config.aws.secretAccessKey,
      bucket: config.aws.s3.uploadBucketName,
    })
  }

  /**
   * 获取预先签署
   */
  public async getPresignedPost(
    key: string,
    acl: string,
    maxUploadSize?: number,
    contentType = 'image',
  ) {
    if (!maxUploadSize) {
      maxUploadSize = config.server.storage.uploadMaxSize
    }
    const expires = this.expires // 秒
    const url = this.client.signatureUrl(key, {
      'method': 'GET',
      expires,
      'Content-Type': contentType,
    })
    // 生成签名，策略等信息
    const policyForm = {
      expiration: new Date(Date.now() + expires * 1000).toISOString(),
      conditions: [
        { bucket: config.aws.s3.uploadBucketName }, // Bucket名称
        ['content-length-range', 0, maxUploadSize],
      ],
    }
    const formData = await this.client.calculatePostSignature(policyForm)
    return {
      url,
      fields: {
        accessId: formData.OSSAccessKeyId,
        OSSAccessKeyId: formData.OSSAccessKeyId,
        success_action_status: 200,
        host: config.aws.s3.accelerateUrl || config.aws.s3.uploadBucketUrl,
        policy: formData.policy,
        signature: formData.Signature,
        expire: new Date().getTime() + expires * 1000,
        key, // 文件路径
      } as any,
    }
  }

  // 查看文件链接
  public getSignedUrl = async (
    key: string,
    expiresIn?: number,
  ) => {
    let url = await this.client.signatureUrl(key, {
      method: 'GET',
      expires: this.expires,
    })
    if (config.aws.s3.accelerateUrl) { // 替换自己链接
      url = url.replace(
        config.aws.s3.uploadBucketUrl,
        config.aws.s3.accelerateUrl,
      )
    }
    return url
  }

  private getEndpoint() {
    if (config.aws.s3.accelerateUrl) {
      return config.aws.s3.accelerateUrl
    }
    if (config.aws.s3.uploadBucketName) {
      return config.aws.s3.uploadBucketUrl
    }
  }

  private getUrlForKey(key: string): string {
    return `${this.getPublicEndpoint()}/${key}`
  }

  private getPublicEndpoint(isServerUpload?: boolean) {
    return config.aws.s3.accelerateUrl || config.aws.s3.uploadBucketUrl
  }

  private getBucket() {
    return config.aws.s3.accelerateUrl || config.aws.s3.uploadBucketName || ''
  }
}
