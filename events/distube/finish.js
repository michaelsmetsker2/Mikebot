import { EmbedBuilder } from "discord.js";

export default async function (queue) {

    const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Finished')
        .setDescription(`Queue is now empty`)
        .setFooter({
            text: `I'm pretty sure that's what this event means, either way i'm leaving the call`,
        });

    await queue.textChannel?.send({ embeds: [embed] });
    setTimeout(() => {
        if (!queue.songs.length && queue.voice) {
            queue.voice.leave();
        }
    }, 3 * 60 * 1000);
}