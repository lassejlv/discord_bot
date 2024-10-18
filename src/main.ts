import { Client } from "discord.js";
import env from "./lib/env";
import logger from "./lib/logger";
import loadCommands from "./lib/load";
import prisma from "./lib/prisma";
import redis from "./lib/redis";
import type { User } from "@prisma/client";

const commands = await loadCommands();

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
  allowedMentions: {
    repliedUser: false,
  }
})

client.once("ready", (c) => {
  logger.info(`logged in as ${c.user.tag}`)
})


client.on("messageCreate", async (message) => {

  if (!message.content.startsWith(env.PREFIX)) return;
  if (message.author.bot) return;

  const [command, ...args] = message.content.slice(env.PREFIX.length).split(" ");
  const cmd = commands.get(command)
  if (!cmd) return;

  try {

    let userData: User | null;

    const isCached = await redis.get(`user:${message.author.id}`);

    if (isCached) {
      userData = JSON.parse(isCached)
    } else {
      userData = await prisma.user.findUnique({ where: { discordId: message.author.id } });
    }

    if (!userData && cmd.details.name !== "accept") throw new Error("please run the accept command first");
    if (userData && cmd.details.name === "accept") throw new Error("you have already accepted the terms of service")

    cmd.run({ message, args, prisma, redis, env })
  } catch (error: any) {
    message.reply(`error: ${error.message}`);
  }
})


client.login(env.TOKEN)
