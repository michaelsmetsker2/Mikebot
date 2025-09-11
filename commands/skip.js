import { EmbedBuilder } from 'discord.js';

export const command = {
    name: 'skip',
    description: 'Skip a song, its a music bot,',
}

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
            const song = await distube.skip(vc);

            await interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setTitle('DisTube')
                        .setDescription(`Skipped to: **${song.name || song.url}**`),
                ],
            });
        } catch (e) {
            console.error(e);
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setTitle('DisTube')
                        .setDescription(`Error: \`${e}\``),
                ],
            });
        }
    }
};