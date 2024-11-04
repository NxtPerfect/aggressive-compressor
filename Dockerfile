FROM oven/bun:alpine AS builder

WORKDIR /app

COPY package*.json .
COPY bun.lockb .

RUN apk add --no-cache bzip3 tar python3 make gcc g++ zlib
RUN bun i

COPY . .

RUN bun run build
RUN bun run db:push

FROM oven/bun:alpine AS deployer

WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/package.json .

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "node", "build" ]
