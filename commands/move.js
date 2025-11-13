// move a song from one nlocation in the queue to another

import { EmbedBuilder, ApplicationCommandOptionType } from 'discord.js';
import { useQueue } from 'discord-player';

export const command = {
    name: 'move',
    description: 'move a song in the queue to a new position',
    options: [
        {
            type: ApplicationCommandOptionType.Number,
            name: 'from',
            description: 'position of the song to move',
            required: true
        },
        {
            type: ApplicationCommandOptionType.Number,
            name: 'to',
            description: 'new position of the song',
            required: true
        },
    ]
}

export default {
    name: 'move',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction) {
        try {
            const queue = useQueue();

            await interaction.deferReply();
            
            const from = interaction.options.getInteger('from', true) - 1;
            const to = interaction.options.getInteger('to', true) - 1;

            if (queue.size < 2) {
                throw new Error("Not enough song in the queue to move");
            }

            if (from >= queue.size || from == to || to >= queue.size || to < 0 || from < 0 ) {
                throw new Error("One or more position is invalid");
            }
            
            const track = queue.tracks.at(from);
            queue.node.move(from, to);


            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                    .setColor('Blurple')
                    .setDescription(`Moved **${track.title}** from position ${from} to ${to}`),
                ]
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
}