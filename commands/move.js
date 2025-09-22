import { EmbedBuilder, MessageFlags } from 'discord.js';

export const command = {
    name: 'move',
    description: 'move a song in the queue to a new position',
    options: [
        {
            type: 4, // integer
            name: 'from',
            description: 'position of the song to move',
            required: true
        },
        {
            type: 4, // integer
            name: 'to',
            description: 'new position of the song',
            required: true
        },
    ]
}

export default {
    name: 'move',
    inVoiceChannel: true,
    async execute(interaction, distube) {
        const vc = interaction.member?.voice?.channel;
        if (!vc) {
            await interaction.reply("You must be in a voice channel to remove a song!");
            return;
        }

        await interaction.deferReply();

        const from = interaction.options.getInteger('from', true) - 1;
        const to = interaction.options.getInteger('to', true) - 1;

        try {
            const queue = distube.getQueue(vc);
            if (!queue || queue.songs.length === 0) {
                await interaction.editReply("There’s nothing in the queue to move!");
                return;
            }

            if (
                from < 1 ||
                from > queue.songs.length ||
                to < 1 ||
                to > queue.songs.length
            ) {
                await interaction.editReply(`Invalid positions! The queue has ${queue.songs.length} songs.`);
                return;
            }

           const [song] = queue.songs.splice(from - 1, 1);
            queue.songs.splice(to - 1, 0, song);

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blurple')
                        .setDescription(`Moved **${song.name || song.url}** from position ${from} to ${to}!`),
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

    }
}