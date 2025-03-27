FROM node:20-alpine AS deps

ARG BUILD_CMD="build"

WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --no-cache bind-tools libc6-compat && \
    npm install

FROM node:20-alpine as builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run ${BUILD_CMD}

FROM node:18-alpine as runner
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache bind-tools && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/server ./.next/server

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
