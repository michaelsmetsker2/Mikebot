import { EmbedBuilder, MessageFlags } from 'discord.js';

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
        let input = interaction.options.getString('input', true);
        const vc = interaction.member?.voice?.channel;
        const skip = false;
        
        await interaction.reply({
            content: `🔍 Searching for: **${input}**`,
            flags: MessageFlags.Ephemeral
        });
		
		//chaos demands for the cum command
		if (input == "cum") {
			input = "https://www.youtube.com/shorts/pfQSp_ko8zM"
		}
		// thus ends the cum segment

        distube
        .play(vc, input, {
            skip,
            textChannel: interaction.channel,
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
