import { defineCommand } from "@/types/Command";


export default defineCommand({
  details: {
    name: "cache",
    description: "Manage cache, reset, update, reload"
  },

  run: async ({ message, args, redis, prisma, env }) => {

    const subcommand = args[0];
    if (!subcommand) return;

    if (message.author.id !== env.DEVELOPER_ID) return;

    switch (subcommand) {
      case "reload":
        await redis.flushall();
        const users = await prisma.user.findMany();

        for (const user of users) {
          await redis.set(`user:${user.discordId}`, JSON.stringify(user))
        }

        await message.reply("Cache has ben reloaded.")
        break;
      default:
        await message.reply("Invalid subcommand")
    }
  }
})
