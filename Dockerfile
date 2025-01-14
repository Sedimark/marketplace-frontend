FROM node:20-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --no-cache bind-tools libc6-compat && \
    npm install

FROM node:20-alpine as builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./.next/standalone/
COPY --from=builder /app/.next/static ./.next/standalone/.next/static/
COPY --from=builder /app/public ./.next/standalone/public/

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
