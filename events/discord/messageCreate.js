// Checks all messages in channels the bot has access to (unfortunately)
import fs from "node:fs";
import { ChannelType, } from 'discord.js';
import 'dotenv/config';


import { annoyFile } from '../../commands/annoy/annoy.js';
import { query } from '../../commands/query/query.js';

export default async (client, message) => {

    if (message.system || message.author.bot) return;

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
            await query(message);
        }
    } catch (error) {
        console.error("Error handling a mention", error);
    }
}