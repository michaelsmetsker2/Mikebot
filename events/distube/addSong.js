// addSong.js 
import { EmbedBuilder } from 'discord.js';

export default async (queue, song) => {
    const requesterName = song.user?.globalName || song.user?.username || 'Unknown';
    const requesterAvatar = song.user?.displayAvatarURL?.({ size: 1024 });

    if (queue.leaveTimeout) {
        clearTimeout(queue.leaveTimeout);
        queue.leaveTimeout = null;
    }

    const embed = new EmbedBuilder()
        .setColor(0x63FF8F)
        .setTitle('Song Added')
        .setDescription(`New song added to the queue\n**Song:** [${song.name} (${song.formattedDuration})](${song.url})\n` +
            `**Position in queue:** ${queue.songs.indexOf(song) + 1}\n`
        )
        .setFooter({
            text: `Requested by ${requesterName}`,
            iconURL: requesterAvatar,
        });

    await queue.textChannel?.send({ embeds: [embed] });
};
