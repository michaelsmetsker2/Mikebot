// noRelatedEvent.js
import { EmbedBuilder, Colors } from 'discord.js';

export default async function (queue, error) {
    await queue.textChannel?.send({
        embeds: [
            new EmbedBuilder()
                .setColor(Colors.Red)
                .setTitle('DisTube')
                .setDescription(error.message)
        ],
    });
};
