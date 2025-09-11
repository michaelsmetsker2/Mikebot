import { EmbedBuilder } from 'discord.js';

export default async (error, queue) => {
    const embed = new EmbedBuilder()
    .setColor(config.ErrorColor)
    .setTitle("Error")
    .setDescription(`Sumthin bad happened: ${error}`);
    await queue.textChannel?.send({ embeds: [embed] });
    console.error(error)
};