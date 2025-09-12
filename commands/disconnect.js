import { EmbedBuilder } from 'discord.js';

export const command = {
    name: 'disconnect',
    description: 'Disconnect the bot from the voice channel',
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
            if (!queue) {
                await interaction.editReply("The bot is not currently in a voice channel!");
                return;
            }

            await distube.voices.leave(vc);

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setTitle('DisTube')
                        .setDescription('Disconnected from the voice channel 🔌'),
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
