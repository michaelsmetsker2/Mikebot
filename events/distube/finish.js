import { EmbedBuilder } from "discord.js";

export default async function (queue) {
    const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Queue is now empty')
        .setDescription('Queue is now empty')
        .setFooter({ text: "Queue is now empty" });

    await queue.textChannel?.send({ embeds: [embed] });

    // Clear any previous timeout
    if (queue.leaveTimeout) clearTimeout(queue.leaveTimeout);

    // store references in case queue is destroyed later
    const guild = queue.voice.channel.guild;
    const distube = queue.distube;

    // schedule leave
    queue.leaveTimeout = setTimeout(() => {
        // get the current queue fresh
        const q = distube.getQueue(guild.id);

        // only leave if there is no queue or no songs are playing
        if (!q || !q.songs.length) {
            distube.voices.leave(guild);
        }

        if (q) q.leaveTimeout = null;
    }, 1 * 60 * 1000);
}
