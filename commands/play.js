/**
 * play.js 
 * it's a music bot, this plays the music
 * TODO maybe add error handling if the bot is playing in a different channel or there is a permissions error
 */

import { EmbedBuilder, MessageFlags } from 'discord.js';
import { useMainPlayer } from 'discord-player';

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
    async execute (interaction) {

        try {
            const player = useMainPlayer();
            let input = interaction.options.getString('input', true);
            const vc = interaction.member.voice.channel;
            
            await interaction.deleteReply();
            await interaction.followup({
                content: `Alright, lookin for: **${input}**`,
                flags: MessageFlags.Ephemeral
            });

            // The cum feature has been added due to popular demand
            if (input == "cum") {
                input = "https://www.youtube.com/shorts/pfQSp_ko8zM"
            }
            
            await player.play(vc, input, {
                nodeOptions: {
                    // used for attatching metadata to the song
                    metadata: interaction.channel,
                },
                requestedBy: interaction.user,
            });
        } catch(error) {
           console.error(error);
           interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setDescription(`Error: \`${error.message}\``),
                ],
           });
        }
    }
}
