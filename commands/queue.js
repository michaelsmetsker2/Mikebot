import { EmbedBuilder } from 'discord.js';
import { RepeatMode } from 'distube';

export const command = {
    name: 'queue',
    description: 'Show the current queue status',
};

export default {
    name: 'queue',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction, distube) {
        const vc = interaction.member?.voice?.channel;
        if (!vc) {
            await interaction.reply("You must be in a voice channel to view the queue!");
            return;
        }

        await interaction.deferReply();

        const queue = distube.getQueue(vc);
        if (!queue) {
            await interaction.editReply("Nothing is playing right now!");
            return;
        }

        const currentSong = queue.songs[0];
        const upNext = queue.songs
            .slice(1, 10)
            .map((song, i) => `**${i + 1}.** \`${song.name || song.url}\``)
            .join("\n") || "None";

        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle('DisTube Queue')
            .setDescription(
                `**Current:** \`${currentSong.name || currentSong.url}\` - \`${queue.formattedCurrentTime}\`/\`${currentSong.formattedDuration}\`\n\n` +
                `**Up next:**\n${upNext}`
            )
            .addFields(
                { 
                    name: "Loop", 
                    value: `${queue.repeatMode === RepeatMode.QUEUE ? "Queue" : queue.repeatMode === RepeatMode.SONG ? "Song" : "Off"}`, 
                    inline: true 
                }
            );

        await interaction.editReply({ embeds: [embed] });
    }
};
