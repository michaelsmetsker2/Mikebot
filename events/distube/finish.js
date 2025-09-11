import { EmbedBuilder } from "discord.js";

export default async function (queue) {

    const embed = new EmbedBuilder()
        .setAuthor({ name: 'MikeBot' })
        .setColor('Blurple')
        .setTitle('Finished')
        .setDescription(`Queue is now empty`)
        .setFooter({
            text: `I'm pretty sure that's what this event means, either way i'm leaving the call`,
        });

    await queue.textChannel?.send({ embeds: [embed] });
    queue.voice.leave();
}