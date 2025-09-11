import { EmbedBuilder } from 'discord.js';
import { RepeatMode } from 'distube';

export const command = {
    name: 'loop',
    description: 'Toggle repeat mode',
};

export default {
    name: 'loop',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction, distube) {
        const vc = interaction.member?.voice?.channel;
        if (!vc) {
            await interaction.reply("You must be in a voice channel to use this!");
            return;
        }

        await interaction.deferReply();

        try {
            const queue = distube.getQueue(vc);
            if (!queue || queue.songs.length === 0) {
                await interaction.editReply("There’s nothing playing to loop!");
                return;
            }

            // Cycle repeat mode
            let newMode;
            switch (queue.repeatMode) {
                case RepeatMode.OFF:
                    newMode = RepeatMode.SONG;
                    break;
                case RepeatMode.SONG:
                    newMode = RepeatMode.QUEUE;
                    break;
                case RepeatMode.QUEUE:
                    newMode = RepeatMode.OFF;
                    break;
                default:
                    newMode = RepeatMode.OFF;
            }

            queue.setRepeatMode(newMode);

            const modeText = newMode === RepeatMode.SONG
                ? 'Song'
                : newMode === RepeatMode.QUEUE
                ? 'Queue'
                : 'Off';

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setTitle('DisTube')
                        .setDescription(`Repeat mode set to **${modeText}** 🔁`),
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
