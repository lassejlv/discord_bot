# Discord Bot

A basic discord bot for your server.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

## Setup Database

This bot uses prisma with Turso (libsql). Create database.

```bash
turso db create <name>
```

```bash
turso db show <name> && turso db tokens create <name>
```

Now update the name in package.json to the name of your database. After that run `bun migrate`. This will run the prisma migrate and the migrate script so we can apply the migrations.

This project was created using `bun init` in bun v1.1.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
