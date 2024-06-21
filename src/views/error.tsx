import type { FC } from 'hono/jsx'
import dayjs from 'dayjs'
import { Layout } from '@/views/layout'
import { gitDate, gitHash } from '@/utils/git-hash'

const Index: FC<{
  requestPath: string
  message: string
  errorRoute: string
  nodeVersion: string
}> = ({ requestPath, message, errorRoute, nodeVersion }) => (
  <Layout>
    <div
      className="pointer-events-none absolute w-full h-screen"
      style={{
        backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMiAzMicgd2lkdGg9JzMyJyBoZWlnaHQ9JzMyJyBmaWxsPSdub25lJyBzdHJva2U9J3JnYigxNSAyMyA0MiAvIDAuMDQpJz48cGF0aCBkPSdNMCAuNUgzMS41VjMyJy8+PC9zdmc+')`,
        maskImage: 'linear-gradient(transparent, black, transparent)',
      }}
    >
    </div>
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-4">
      <h1 className="text-4xl font-bold">Looks like something went wrong</h1>
      <div className="text-left w-[800px] space-y-6 !mt-10">
        <div className="space-y-2">
          <p className="mb-2 font-bold">Helpful Information</p>
          <p className="message">
            Error Message:
            <br />
            <code className="mt-2 block max-h-28 overflow-auto bg-zinc-100 align-bottom w-fit details">{message}</code>
          </p>
          <p className="message">
            Route:
            {' '}
            <code className="ml-2 bg-zinc-100">{errorRoute}</code>
          </p>
          <p className="message">
            Full Route:
            {' '}
            <code className="ml-2 bg-zinc-100">{requestPath}</code>
          </p>
          <p className="message">
            Node Version:
            {' '}
            <code className="ml-2 bg-zinc-100">{nodeVersion}</code>
          </p>
          <p className="message">
            Git Hash:
            {' '}
            <code className="ml-2 bg-zinc-100">{gitHash}</code>
          </p>
          <p className="message">
            Git Date:
            {' '}
            <code className="ml-2 bg-zinc-100">{dayjs(gitDate).format('YYYY/MM/DD HH:mm:ss')}</code>
          </p>
        </div>
      </div>
    </div>
  </Layout>
)

export default Index
