import { EmbedBuilder } from 'discord.js';

export default async function (queue, song) {
    try {

        const requesterName = song.user?.globalName || song.user?.username || 'Unknown';
        const requesterAvatar = song.user?.displayAvatarURL?.({ size: 1024 });

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
                    .setDescription(`Playing: [${song.name} (${song.formattedDuration})](${song.url})`)
                    .setFooter({
                        text: `Requested by ${requesterName}`,
                        iconURL: requesterAvatar,
                    }),
            ],
        });
    } catch (err) {
        console.error(err);
    }
};
