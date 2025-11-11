import { EmbedBuilder } from 'discord.js';
import { QueueRepeatMode, useQueue } from 'discord-player';

export const command = {
    name: 'loop',
    description: 'Toggle repeat mode',
};

export default {
    name: 'loop',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction) {
        try {
            await interaction.deferReply();

            const queue = useQueue();
            
            if (queue.repeatMode == QueueRepeatMode.OFF) {
                queue.setRepeatMode(QueueRepeatMode.TRACK);
            } else {
                queue.setRepeatMode(QueueRepeatMode.OFF);
            }
            
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                    .setColor('Blurple')
                    .setDescription(`Repeat mode set to **${queue.repeatMode}**`),
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
