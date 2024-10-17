import { Client } from "discord.js";
import env from "./lib/env";
import logger from "./lib/logger";
import loadCommands from "./lib/load";

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

  await message.channel.sendTyping();


  try {
    cmd.run({ message, args })
  } catch (error) {
    logger.error(error);
    message.reply("An error occured while executing this command");
  }
})


client.login(env.TOKEN)
