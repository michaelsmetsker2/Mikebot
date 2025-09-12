import { EmbedBuilder } from 'discord.js';

export const command = {
    name: 'stop',
    description: 'Stop the playing queue',
};

export default {
    name: 'stop',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction, distube) {
        const vc = interaction.member?.voice?.channel;
        if (!vc) {
            await interaction.reply("You must be in a voice channel to stop the queue!");
            return;
        }

        await interaction.deferReply();

        try {
            await distube.stop(vc);
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setTitle('DisTube')
                        .setDescription('Stopped!'),
                ],
            });
            queue.voice.leave();
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
            queue.voice.leave();
        }
    },
};
