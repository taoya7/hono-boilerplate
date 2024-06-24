import { JSX } from 'hono/jsx'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import Oy from 'oy-vey'
import nodemailer, { Transporter } from 'nodemailer'
import { baseStyles } from './templates/components/email-layout'
import { config } from '@/config'
import Logger from '@/logging/logger'

interface SendMailOptions {
  to: string
  fromName?: string
  replyTo?: string
  subject: string
  previewText?: string
  text: string
  component: JSX.HTMLAttributes
  headCSS?: string
  unsubscribeUrl?: string
}

export class Mailer {
  transporter: Transporter | undefined

  constructor() {}
  template = ({
    title,
    bodyContent,
    headCSS = '',
    bgColor = '#FFFFFF',
    lang,
    dir = 'ltr' /* https://www.w3.org/TR/html4/struct/dirlang.html#blocklevel-bidi */,
  }: Oy.CustomTemplateRenderOptions) => {
    if (!title) {
      throw new Error('`title` 是 `renderTemplate` 函数的必需参数')
    }
    else if (!bodyContent) {
      throw new Error('`bodyContent` 是 `renderTemplate` 函数的必需参数')
    }
  }

  sendMail = async (data: SendMailOptions): Promise<void> => {
    const { transporter } = this
    if (!transporter) {
      Logger.info(
        'email',
        `尝试发送主题为 "${data.subject}" 的邮件到 ${data.to}`,
      )
    }
    const html = Oy.renderTemplate(
      data.component,
      {
        title: data.subject,
        headCSS: [baseStyles, data.headCSS].join(' '),
      } as Oy.RenderOptions,
      this.template,
    )
  }

  private getOptions(): SMTPTransport.Options {
    return {
      name: config.SMTP_NAME,
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_SECURE ?? config.ENV === 'production',
      auth: config.SMTP_USERNAME
        ? {
            user: config.SMTP_USERNAME,
            pass: config.SMTP_PASSWORD,
          }
        : undefined,
      tls: config.SMTP_SECURE
        ? config.SMTP_TLS_CIPHERS
          ? {
              ciphers: config.SMTP_TLS_CIPHERS,
            }
          : undefined
        : {
            rejectUnauthorized: false,
          },
    }
  }

  private async getTestTransportOptions(): Promise<
    SMTPTransport.Options | undefined
  > {
    try {
      const testAccount = await nodemailer.createTestAccount()
      return {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      }
    }
    catch (err) {
      return undefined
    }
  }
}

export default new Mailer()
