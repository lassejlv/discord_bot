import { GetUserData } from "@/lib/helpers";
import { defineCommand } from "@/types/Command";


export default defineCommand({
  details: {
    name: 'delete',
    description: "Delete all your data"
  },

  run: async ({ message, prisma, redis, args }) => {

    const confirmation = args.join(" ");
    if (confirmation !== "confirm") return message.reply("please type `confirm` to delete all your data");

    const user = await GetUserData(message.author.id);
    if (!user) return message.reply("you have not accepted the terms of service");

    await prisma.todoList.deleteMany({ where: { id: user.id } });
    await prisma.user.delete({ where: { id: user.id } });

    await redis.del(`user:${message.author.id}`);

    message.reply("all your data has been deleted");
  }
})
