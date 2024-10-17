import type { PrismaClient } from "@prisma/client";
import type { Message } from "discord.js";

interface Context {
  message: Message;
  args: string[];
  prisma: PrismaClient;
}

export interface Command {
  details: { name: string; description: string; }
  run: (ctx: Context) => void;
}

export function defineCommand(command: Command) {
  return command;
}
