import { EmbedBuilder } from 'discord.js';

export const command = {
    name: 'pause',
    description: 'Pause the currently playing song',
};

export default {
    name: 'pause',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction, distube) {
        const vc = interaction.member?.voice?.channel;
        if (!vc) {
            await interaction.reply("You must be in a voice channel to pause!");
            return;
        }

        await interaction.deferReply();

        try {
            const queue = distube.getQueue(vc);
            if (!queue || queue.songs.length === 0) {
                await interaction.editReply("There’s nothing playing to pause!");
                return;
            }

            if (queue.paused) {
                await interaction.editReply("The queue is already paused!");
                return;
            }

            await distube.pause(vc);

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setTitle('DisTube')
                        .setDescription('Paused the current song 🎵'),
                ],
            });
        } catch (e) {
            console.error(e);
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setTitle('DisTube')
                        .setDescription(`Error: \`${e.message || e}\``),
                ],
            });
        }
    },
};
