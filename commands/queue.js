import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const command = {
    name: 'queue',
    description: 'Show the current queue status',
};

export default {
    name: 'queue',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const queue = useQueue();
            
            const upcomingTracks = queue.tracks.toArray().slice(0, 10);
            const currentTrack = queue.currentTrack;
            const upNext = upcomingTracks.map((track, i) => `**${i}.** - \`${track.title} - ${track.duration}\``).join("\n") || "None";
            
            const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setDescription(
                `**Current:** [${currentTrack.title} - TODO/${currentTrack.duration}](${currentTrack.url})\n\n` +
                `**Up next:**\n${upNext}`
            )
            .addFields(
                { 
                    name: "Loop", 
                    value: `${queue.repeatMode}`, 
                    inline: true 
                },
                {
                    name: "Total Songs",
                    value: `${queue.tracks.size}`,
                    inline: true
                }
            );
            
            await interaction.editReply({ embeds: [embed] });
        
        } catch (error) {
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
};    