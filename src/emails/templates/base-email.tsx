import { JSX } from 'hono/jsx/jsx-runtime'

export interface EmailProps {
  to: string | null
}
export default abstract class BaseEmail<
  T extends EmailProps,
  S extends Record<string, any> | void = void,
> {
  private props: T
  constructor(props: T) {
    this.props = props
  }
  /**
   * Returns a plain-text version of the email, this is the text that will be
   * shown if the email client does not support or want HTML.
   *
   * @param props Props in email constructor
   * @returns The plain text email as a string
   */
  protected abstract renderAsText(props: S & T): string
  /**
   * Returns a React element that will be rendered on the server to produce the
   * HTML version of the email.
   *
   * @param props Props in email constructor
   * @returns A JSX element
   */
  protected abstract render(props: S & T): JSX.Element
  /**
   * Returns the subject of the email.
   *
   * @param props Props in email constructor
   * @returns The email subject as a string
   */
  protected abstract subject(props: S & T): string
  /**
   * Returns the preview text of the email, this is the text that will be shown
   * in email client list views.
   *
   * @param props Props in email constructor
   * @returns The preview text as a string
   */
  protected abstract preview(props: S & T): string
  /**
   * 返回邮件的退订 URL。
   *
   * @param props 邮件构造函数中的属性
   * @returns 一个字符串形式的退订 URL
   */
  protected unsubscribeUrl?(props: T): string
  /**
   * 允许在邮件的 head 部分注入额外的 CSS。
   *
   * @param props 邮件构造函数中的属性
   * @returns 一段 CSS 字符串
   */
  protected headCSS?(props: T): string | undefined
  /**
   * beforeSend 钩子允许异步加载未通过序列化的 worker 属性传递的额外数据。
   * 如果返回 false，则中止发送邮件。
   *
   * @param props 构造函数中的属性
   * @returns promise
   */
  protected beforeSend?(props: T): Promise<S | false>
  /**
   * fromName 钩子允许重写邮件的“发件人”名称。
   */
  protected fromName?(props: T): string | undefined
}
