import { EmbedBuilder } from 'discord.js';

export default async function (queue, song) {
    try {
        const interaction = song.metadata?.interaction;
        if (!interaction) return;

        if (queue.leaveTimeout) {
            clearTimeout(queue.leaveTimeout);
            queue.leaveTimeout = null;
        }

        await queue.textChannel?.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('Blurple')
                    .setDescription(`Playing: \`${song.name}\``),
            ],
        });
    } catch (err) {
        console.error(err);
    }
};
