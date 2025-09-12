import { EmbedBuilder } from 'discord.js';

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
    async execute(interaction, distube) {
        const vc = interaction.member?.voice?.channel;
        if (!vc) {
            await interaction.reply("You must be in a voice channel to remove a song!");
            return;
        }

        await interaction.deferReply();

        try {
            const queue = distube.getQueue(vc);
            if (!queue || queue.songs.length === 0) {
                await interaction.editReply("There’s nothing in the queue to remove!");
                return;
            }

            const position = interaction.options.getInteger('position', true);
            if (position < 1 || position > queue.songs.length) {
                await interaction.editReply(`Invalid song number! Please provide a number between 1 and ${queue.songs.length}.`);
                return;
            }

            const removedSong = queue.songs.splice(position - 1, 1)[0];

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription(`Removed song: **${removedSong.name || removedSong.url}** from the queue!`),
                ],
            });
        } catch (e) {
            console.error(e);
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription(`Error: \`${e}\``),
                ],
            });
        }
    },
};
