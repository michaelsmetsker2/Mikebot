import { EmbedBuilder, InteractionResponseFlags } from 'discord.js';

export const command = {
    name: 'play',
    description: 'Play a song, its a music bot,',
        options: [{
        type: 3, //string
        name: 'input',
        description: 'url or search query',
        required: true
    }],
}

export default {
    name: 'play',
	inVoiceChannel: true,
    async execute (interaction, distube) {
        const input = interaction.options.getString('input', true);
        const vc = interaction.member?.voice?.channel;
        const skip = false;
        
        await interaction.reply({
            content: `🔍 Searching for: **${input}**`,
            flags: InteractionResponseFlags.Ephemeral
        });

        distube
        .play(vc, input, {
            skip,
            undefined,
            textChannel: interaction.channel ?? undefined,
            member: interaction.member,
            metadata: { interaction },
        })
        .catch(e => {
            console.error(e);
            interaction.editReply({
            embeds: [
                new EmbedBuilder()
                .setColor('Blurple')
                .setDescription(`Error: \`${e.message}\``),
            ],
            });
        });
    }
}