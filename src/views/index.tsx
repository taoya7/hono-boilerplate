import { FC } from 'hono/jsx'

const Index: FC<{ }> = () => {
  return (
    <div>
      <h1>服务已启动</h1>
      <ul>
        <li><a href="/api/doc.html" target="_blank">文档</a></li>
      </ul>
    </div>
  )
}
export default Index
