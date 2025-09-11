// addListEvent.js
import { EmbedBuilder } from 'discord.js';

export default async (queue, playlist) => {

    const embed = new EmbedBuilder()
        .setAuthor({ name: 'MikeBot' })
        .setColor('Blurple')
        .setTitle('Playlist added')
        .setDescription(`Added \`${playlist.name}\` (${playlist.songs.length} songs) to the queue`)
        .setFooter({
            text: 'if this was an accidental playlist add... lmao you are loser',
            iconURL: 'https://dontshootthemetskinger.quest/images/alien.gif'
        });

    await queue.textChannel?.send({ embeds: [embed] });
};
