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
            await interaction.editReply("You must be in a voice channel to disconnect the bot!");
            return;
        }

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
        })
    },
};
