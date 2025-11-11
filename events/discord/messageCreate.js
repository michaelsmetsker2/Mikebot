// Checks all messages in channels the bot has access to (unfortunately)
import { ChannelType, } from 'discord.js';
import 'dotenv/config';

import { annoyFile } from '../../commands/annoy.js';
import query from '../../commands/query.js';

export default async (client, message) => {

    if (message.system || message.author.bot) return;

    // Listen for Direct Messages with attachments
    try {
        if (message.channel.type == ChannelType.DM && message.attachments.size > 0) {
            await annoyFile(message);
        }
    } catch (error) {
        console.error("Error handling Direct Message", error);
    }

    // Listen for messages tagging the bot
    try {
        if (message.mentions.has(client.user, { ignoreEveryone: true, ignoreRoles: true })) { // Checks for exclusive mention
            await query.execute(message);
        }
    } catch (error) {
        console.error("Error handling a mention", error);
    }
}