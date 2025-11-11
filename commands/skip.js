import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const command = {
    name: 'skip',
    description: 'Skip a song, its a music bot',
};

export default {
    name: 'skip',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction) {
        
        const queue = useQueue();

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                .setColor('Blurple')
                .setDescription(`Skipping **${queue.currentTrack.name || queue.currentTrack.url}**`),
            ],
        });

        queue.node.skip();
    },
};
