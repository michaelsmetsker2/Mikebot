import { EmbedBuilder } from "discord.js";

export default async function (queue) {
    const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Queue is now empty')
        .setDescription('Queue is now empty')
        .setFooter({
            text: "Queue is empty",
        });
        queue.voice.leave();

    await queue.textChannel?.send({ embeds: [embed] });

    // Clear any previous timeout just in case
    if (queue.leaveTimeout) clearTimeout(queue.leaveTimeout);

    // Schedule leave after 3 min if no new songs are added
    queue.leaveTimeout = setTimeout(() => {
        if (!queue.songs.length && queue.voiceConnection) {
            queue.voice.leave();
        }
        queue.leaveTimeout = null;
    }, 3000);
} ///3 * 60 * 1000
