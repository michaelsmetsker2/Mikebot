import { EmbedBuilder } from 'discord.js';

export default async function (queue, song) {
    try {
        const interaction = song.metadata?.interaction;
        if (!interaction) return;

        await interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle('DisTube')
                    .setDescription(`Playing: \`${song.name}\``),
            ],
        });
    } catch (err) {
        console.error(err);
    }
};
