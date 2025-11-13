import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const command = {
    name: 'remove',
    description: 'Remove a song from the queue by its number',
    options: [
        {
            type: 4, // Integer
            name: 'position',
            description: 'The song number in the queue to remove (starting from 1)',
            required: true,
        },
    ],
};

export default {
    name: 'remove',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction) {
        
        try {
            await interaction.deferReply();
            const position = interaction.options.getInteger('position', true);
            const queue = useQueue();

            if (queue.size < 1) {
                await interaction.editReply("There’s nothing in the queue to remove!");
                return;
            }

            if (position < 0 || position > queue.size) {
                await interaction.editReply(`Invalid song number! Please provide a number between 0 and ${queue.size}.`);
                return;
            }
            
            queue.removeTrack(position);

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription(`Removing song in queue position: **${position}** from the queue.`),
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
