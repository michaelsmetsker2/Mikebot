import { EmbedBuilder } from 'discord.js';

export const command = {
    name: 'stop',
    description: 'Stop the playing queue',
};

export default {
    name: 'stop',
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
            }

            await distube.voices.leave(vc);

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription('Stopped playback'),
                ],
            });
        } catch (e) {
            console.error(e);
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription(`Error: \`${e.message || e}\``),
                ],
            });
        }
    },
};
