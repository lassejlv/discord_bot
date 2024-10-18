import { defineCommand } from "@/types/Command";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";



export default defineCommand({
  details: {
    name: 'accept',
    description: 'Accept terms of service',
  },
  run: async ({ message, prisma, redis, args }) => {

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('accept')
        .setStyle(ButtonStyle.Success)
        .setLabel('Accept'),
      new ButtonBuilder()
        .setCustomId('decline')
        .setStyle(ButtonStyle.Danger)
        .setLabel('Decline')
    )

    const msg = await message.reply({ components: [buttonRow], content: 'Do you accept the terms of service?' })

    const filter = (interaction: any) => { return interaction.user.id === message.author.id }
    const collector = msg.createMessageComponentCollector({ filter });

    collector.on('collect', async (interaction) => {
      const { customId } = interaction;

      if (customId !== "accept" && customId !== "decline") {
        collector.stop()
        return;
      }

      switch (customId) {
        case "accept":
          const newUser = await prisma.user.create({
            data: {
              discordId: message.author.id,
              termsAccepted: true,
            }
          })

          collector.stop();
          await redis.set(`user:${message.author.id}`, JSON.stringify(newUser));
          await msg.edit({ content: 'You have accepted the terms of service', components: [] })
          break;
        case "decline":
          await msg.edit({ content: 'You have declined the terms of service', components: [] })
          collector.stop()
          break;
      }
    })
  }
})
