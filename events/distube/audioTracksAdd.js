/**
 * Emits when a playlist is added to the queue
 */
import { EmbedBuilder } from 'discord.js';
const GREEN = 0x63FF8F;

export default async (queue, track) => {
    console.log(track);
    /*    
    try {    
        const embed = new EmbedBuilder()
            .setColor(GREEN)
            .setTitle('Playlist added')
            .setDescription(`Added \`${playlist.name}\` (${playlist.songs.length} songs) to the queue`)
            .setFooter({
                text: 'if this was an accidental playlist add... lmao you are loser',
                iconURL: 'https://dontshootthemetskinger.quest/images/alien.gif'
            });
    } catch(e) {
        console.error(e);
        queue.channel.send({
            embeds: [
                new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(`Error: \`${e.message}\``),
            ],
        });
    }
    
    await queue.metadata.send({ embeds: [embed] });
    */
};
/*
        const requesterName = track.requestedBy?.globalName || track.requestedBy?.username || 'Unknown';
        const requesterAvatar = track.requestedBy?.displayAvatarURL?.({ size: 1024 });
        
        const queueArray = queue.tracks.toArray(); // convert collection to array
        const position = queueArray.indexOf(track) + 1; // +1 to make it 1-based

        if (queue.leaveTimeout) {
            clearTimeout(queue.leaveTimeout);
            queue.leaveTimeout = null;
        }
        
        const embed = new EmbedBuilder()
        .setTitle('Song Added')
        .setDescription(`New song added to the queue\n**Song:** [${track.title} (${track.duration})](${track.url})\n` +
            `**Position in queue:** ${position}\n`
        )
        .setFooter({
            text: `Requested by ${requesterName}`,
            iconURL: requesterAvatar,
        });
*/