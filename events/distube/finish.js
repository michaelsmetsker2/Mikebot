import { EmbedBuilder } from "discord.js";

export default async function (queue) {
    const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Queue is now empty')
        .setDescription('Queue is now empty')
        .setFooter({
            text: "Queue is now empty",
        });
        
    await queue.textChannel?.send({ embeds: [embed] });

    // Clear any previous timeout just in case
    if (queue.leaveTimeout) clearTimeout(queue.leaveTimeout);

    // schedule leave
    queue.leaveTimeout = setTimeout(() => {
        if (!queue.songs.length) {
            queue.voice.leave();
        }
        queue.leaveTimeout = null;
    }, 3 * 60 * 1000);
}
