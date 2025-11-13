//stops and disconnects the bot

import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const command = {
    name: 'stop',
    description: 'Stop the playing queue',
};

export default {
    name: 'stop',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction) {
        try {
            await interaction.deferReply();

            const queue = useQueue();

            queue.node.stop();

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription('Stopped playback'),
                ],
            });
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription(`Error: \`${error.message}\``),
                ],
            });
        }
    },
};
