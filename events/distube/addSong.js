// addListSong.js
import { EmbedBuilder } from 'discord.js';

export default async (queue, song) => {
    const requesterName = song.user?.globalName || song.user?.username || 'Unknown';
    const requesterAvatar = song.user?.displayAvatarURL?.({ size: 1024 });

    const embed = new EmbedBuilder()
        .setAuthor({ name: 'MikeBot' })
        .setColor('Blurple')
        .setTitle('Song Added')
        .setDescription(`New song added to the queue\n**Song:** [${song.name} (${song.formattedDuration})](${song.url})`)
        .setFooter({
            text: `Requested by ${requesterName}`,
            iconURL: requesterAvatar,
        });

    await queue.textChannel?.send({ embeds: [embed] });
};
