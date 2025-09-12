import { EmbedBuilder } from 'discord.js';

export const command = {
    name: 'disconnect',
    description: 'Stop playback, clear the queue, and disconnect the bot',
};

export default {
    name: 'disconnect',
    inVoiceChannel: true,
    async execute(interaction, distube) {
        const vc = interaction.member?.voice?.channel;
        if (!vc) {
            await interaction.reply("You must be in a voice channel to disconnect the bot!");
            return;
        }

        await interaction.deferReply();

        try {
            const queue = distube.getQueue(vc);
            if (queue) {
                // Stop clears the queue and leaves the VC
                await distube.stop(vc);
            } else {
                // No queue, just leave if connected
                await distube.voices.leave(vc);
            }

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setTitle('DisTube')
                        .setDescription('Stopped playback, cleared the queue, and disconnected from the voice channel 🔌'),
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
