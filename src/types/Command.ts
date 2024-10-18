import type env from "@/lib/env";
import type { PrismaClient } from "@prisma/client";
import type { Message } from "discord.js";
import type Redis from "ioredis";

interface Context {
  message: Message;
  args: string[];
  prisma: PrismaClient;
  redis: Redis;
  env: typeof env;
}

export interface Command {
  details: { name: string; description: string; }
  run: (ctx: Context) => void;
}

export function defineCommand(command: Command) {
  return command;
}
