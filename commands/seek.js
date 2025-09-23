import { EmbedBuilder } from 'discord.js';

export const command = {
    name: 'seek',
    description: 'Seek the current song',
    options: [
        {
            type: 10, // NUMBER
            name: 'time',
            description: 'The time to seek (in seconds)',
            required: true,
            min_value: 0,
        },
    ],
};

export default {
    name: 'seek',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction, distube) {
        const vc = interaction.member?.voice?.channel;
        if (!vc) {
            await interaction.reply("You must be in a voice channel to seek!");
            return;
        }

        const time = interaction.options.getNumber('time', true);

        await interaction.deferReply();

        try {
            await distube.seek(interaction, time);
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription(`Seeked to \`${time}\` seconds`),
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
