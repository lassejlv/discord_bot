import type { Message } from "discord.js";

interface Context {
  message: Message;
  args: any[];
}

export interface Command {
  details: { name: string; description: string; }
  options?: CommandArgOption[];
  run: (ctx: Context) => void;
}

export interface CommandArgOption {
  name: string;
  type: "string" | "number" | "boolean";
  required: boolean;
  stringMaxLength?: number;
  stringMinLength?: number;
  numberMax?: number;
}


export function defineCommand(command: Command) {
  return command;
}

export function parseCommand(message: Message): Context | null {
  const [commandName, ...args] = message.content.split(" ");
  return {
    message,
    args,
  };
}
