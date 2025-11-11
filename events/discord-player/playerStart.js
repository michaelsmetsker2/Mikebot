/** 
 * playerStart.js 
 * puts a message in the relevant channel to tell what song just started playing
*/

import { EmbedBuilder } from 'discord.js';

export default async (queue, track) => {
    try {
        const requesterName = track.requestedBy?.globalName || track.requestedBy?.username || 'Unknown';
        const requesterAvatar = track.requestedBy?.displayAvatarURL?.({ size: 1024 });
        
        //todo add a test to see if relevant metadata exists

        await queue.metadata.send({
            embeds: [
                new EmbedBuilder()
                .setColor('Blurple')
                .setDescription(`Playing: [${track.title} (${track.duration})](${track.url})`)
                .setFooter({
                    text: `Requested by ${requesterName}`,
                    iconURL: requesterAvatar,
                }),
            ],
        });
        
    } catch (e) {
        console.error(e);
        queue.metadata.send({
            embeds: [
                new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(`Error: \`${e.message}\``),
            ],
        });
    }
};
