import type { FC } from 'hono/jsx'

export const Layout: FC = props => (
  <html>
    <head>
      <title></title>
      <script src="/js/tailwindcss.js"></script>
      <style>
        {
          `
          details::-webkit-scrollbar {
            width: 0.25rem;
          }
          details::-webkit-scrollbar-thumb {
              border-radius: 0.125rem;
              background-color: #e4e4e7;
          }
          details::-webkit-scrollbar-thumb:hover {
              background-color: #a1a1aa;
          }
          @font-face {
            font-family: Inter;
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url(/fonts/Inter.var.woff2) format(woff2);
          }
          body {
              font-family: Inter, sans-serif;
          }
          `
        }
      </style>
    </head>
    <body className="antialiased text-zinc-700">{props.children}</body>
  </html>
)
