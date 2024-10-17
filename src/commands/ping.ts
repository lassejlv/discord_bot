import { defineCommand } from "@/types/Command";



export default defineCommand({
  details: {
    name: "ping",
    description: "Check the bot's latency",
  },

  run: async (ctx) => {
    const { message } = ctx;
    return message.reply(`Pong!`);
  }
})
