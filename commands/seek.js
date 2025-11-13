import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const command = {
    name: 'seek',
    description: 'Seek the current song',
    options: [
        {
            type: 10, // NUMBER
            name: 'time',
            description: 'The time to seek (in seconds)',
            required: true,
            min_value: 0,
        },
    ],
};

export default {
    name: 'seek',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction) {
        
        try {
            await interaction.deferReply();
            const queue = useQueue();
            const time = interaction.options.getNumber('time', true);

            queue.node.seek(time * 1000); 

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription(`Seeked to \`${time}\` seconds`),
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
