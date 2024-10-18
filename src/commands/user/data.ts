import { GetUserData } from "@/lib/helpers";
import { defineCommand } from "@/types/Command";


export default defineCommand({
  details: {
    name: 'data',
    description: "Retrieve all your data"
  },

  run: async ({ message }) => {



    const user = await GetUserData(message.author.id);
    if (!user) return message.reply("you have not accepted the terms of service");

    const json = `\`\`\`${JSON.stringify(user, null, 2)}\`\`\``

    await message.react("📬")

    await message.author.send(json).catch(() => {
      message.reply("I could not send you a DM, please enable DMs from server members")
    })
  }
})
