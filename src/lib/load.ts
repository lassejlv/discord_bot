import type { Command } from "@/types/Command";
import { resolve } from "path";
import { z } from "zod";
import logger from "./logger";


const schema = z.object({
  details: z.object({
    name: z.string(),
    description: z.string(),
  }),
  run: z.function(),
})


const loadCommands = async (): Promise<Map<string, Command>> => {

  const output = new Map<string, Command>();
  const glob = new Bun.Glob("src/commands/**/*.ts");

  for await (const file of glob.scan(".")) {

    const path = resolve(file);
    const command = await import(path).then((m) => m.default) as Command;

    const parsed = schema.safeParse(command);

    if (!parsed.success) {
      logger.warn(`command failed to load at ${path}: ${parsed.error}`)
      continue;
    }

    output.set(parsed.data.details.name, parsed.data);
  }

  return output;
}


export default loadCommands;
