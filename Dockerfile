
FROM node:20-alpine AS base

FROM base AS builder
WORKDIR /app
RUN sed -i "s@http://dl-cdn.alpinelinux.org/@https://repo.huaweicloud.com/@g" /etc/apk/repositories
RUN apk add --no-cache tzdata
ENV TZ="Asia/Shanghai"
RUN npm config set registry https://registry.npmmirror.com
COPY package.json ./package.json
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build
FROM base AS runner
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

EXPOSE 3000

CMD ["npm", "run", "start"]