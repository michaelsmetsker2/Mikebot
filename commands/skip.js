import { EmbedBuilder } from 'discord.js';

export const command = {
    name: 'skip',
    description: 'Skip a song, its a music bot',
};

export default {
    name: 'skip',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction, distube) {
        const vc = interaction.member?.voice?.channel;
        if (!vc) {
            await interaction.reply("You must be in a voice channel to skip!");
            return;
        }

        await interaction.deferReply();

        try {
            const queue = distube.getQueue(vc);
            if (!queue || queue.songs.length === 0) {
                await interaction.editReply("There’s nothing playing to skip!");
                return;
            }

            if (queue.songs.length === 1) {
                // Only one song left, stop the queue
                await distube.stop(vc);
                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Blurple')
                            .setTitle('DisTube')
                            .setDescription('Skipped the last song and stopped playback!'),
                    ],
                });
                return;
            }

            // Skip normally
            const song = await distube.skip(vc);
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription(`Skipped to: **${song.name || song.url}**`),
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
