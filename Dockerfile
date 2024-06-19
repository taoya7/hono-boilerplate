
FROM node:20-alpine AS base

FROM base AS builder
WORKDIR /app
ENV TZ="Asia/Shanghai"
COPY . .
RUN npm install -g pnpm
RUN npm install -g nrm
RUN nrm use npm
RUN pnpm i 
RUN pnpm run build
FROM base AS runner
WORKDIR /app
RUN sed -i "s@http://dl-cdn.alpinelinux.org/@https://repo.huaweicloud.com/@g" /etc/apk/repositories
RUN apk add --no-cache tzdata
RUN apk add curl
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

EXPOSE 3000

CMD ["npm", "run", "start"]