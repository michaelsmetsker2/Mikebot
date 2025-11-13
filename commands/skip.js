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
        try {
            await interaction.deferReply();

            const queue = useQueue();
            queue.node.skip();

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                    .setColor('Blurple')
                    .setDescription(`Skipping [${queue.currentTrack.title}](${queue.currentTrack.url})`),
                ],
            });

        } catch (error) {
            console.error(error);
            interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setDescription(`Error: \`${error.message}\``),
                ],
           });
        }
    }
};
