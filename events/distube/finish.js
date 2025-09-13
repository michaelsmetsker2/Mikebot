import { EmbedBuilder } from "discord.js";

export default async function (queue) {
    const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Queue is now empty')
        .setDescription('Queue is now empty')
        .setFooter({
            text: "Queue is empty",
        });

    await queue.textChannel?.send({ embeds: [embed] });
    await distube.voices.leave(queue);

    // Clear any previous timeout just in case
    if (queue.leaveTimeout) clearTimeout(queue.leaveTimeout);

    // Schedule leave after 3 min if no new songs are added
    queue.leaveTimeout = setTimeout(async () => {
        if (!queue.songs.length && queue.voiceConnection) {
            await distube.voices.leave(queue);
        }
        queue.leaveTimeout = null;
    }, 3000);
} ///3 * 60 * 1000
