FROM node:18 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npx nuxt prepare

RUN npm run build

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/.output .output
COPY --from=builder /app/package.json package.json

RUN npm install --only=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
