import { defineCommand } from "@/types/Command";

export default defineCommand({
  details: {
    name: "ping",
    description: "Check the bot's latency",
  },

  run: async ({ message, args }) => {
    console.log(args)
    return message.reply(`Pong!`);
  }
})
