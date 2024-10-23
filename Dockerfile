FROM oven/bun:latest

WORKDIR /app
COPY . .

RUN bun install

## Includes lint, build and prisma generate
RUN bun run build 

CMD ["./bot"]
