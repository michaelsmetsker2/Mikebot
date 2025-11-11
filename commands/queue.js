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
        
        const queue = useQueue();
        
        const upcomingTracks = queue.tracks.toArray().slice(0, 10);
        const currentTrack = queue.currentTrack;
        const upNext = upcomingTracks.map((track, i) => `**${i + 1}.** - \`${track.title} - ${track.duration}\``).join("\n") || "None";

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
                    value: "TODO",
                    inline: true
                }
            );

        await interaction.editReply({ embeds: [embed] });
    }
};
