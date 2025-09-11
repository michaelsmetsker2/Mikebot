// addListSong.js
import { EmbedBuilder } from 'discord.js';

export default async (queue, song) => {

    const embed = new EmbedBuilder()
        .setAuthor({ name: 'MikeBot' })
        .setColor('Blurple')
        .setTitle('Song Added')
        .setDescription(`New song added to the queue\n**Song:** [${song.name} (${song.formattedDuration})](${song.url})`)
        .setFooter({
            text: `Requested by ${song.user.globalName || song.user.username}`,
            iconURL: song.user.displayAvatarURL({ size: 1024 }),
        });

    await queue.textChannel?.send({ embeds: [embed] });
};
