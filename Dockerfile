FROM oven/bun:latest

WORKDIR /app
COPY . .

RUN bun install
RUN bun build --compile src/main.ts --outfile bot
RUN bunx prisma generate

CMD ["./bot"]
