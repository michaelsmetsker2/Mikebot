import { EmbedBuilder } from 'discord.js';
import {useTimeline } from 'discord-player';

export const command = {
    name: 'pause',
    description: 'Pause or resume the currently playing song',
};

export default {
    name: 'pause',
    inVoiceChannel: true,
    playing: true,
    async execute(interaction) {
        const timeline = useTimeline();
        
        // This is a redundancy since playing is true
        if (!timeline) {
            await interaction.editReply('This server does not have an active player session.');
        }

        const wasPaused = timeline.paused;
        wasPaused ? timeline.resume() : timeline.pause();

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor('Blurple')
                    .setDescription(`The player is now ${wasPaused ? 'resumed' : 'paused'}.`),
            ],
        });
    },
};
