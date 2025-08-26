/**
 * @fileoverview
 * Main file of mikebot, sets it all up and such
 */

import fs from "node:fs";
import { Client, GatewayIntentBits, Events, Emoji, ChannelType, Partials, Collection} from 'discord.js';
import { annoy, annoyFile } from './commands/annoy/annoy.js';
import { query } from './commands/query/query.js';
import { ttm } from './commands/ttm/ttm.js';
import 'dotenv/config';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, // lets the bot join servers
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent, // lets the bot parse contents of messages 
		GatewayIntentBits.DirectMessages
	],
	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.User
	],
});

client.MessageCommands = new Collection();
client.SlashCommands = new Collection();
client.CurrentSongs = [];

const commandQueue = []; // queue of tts command calls so that they dont run at the same time
let activeQueue = false;

// Even Handlers
console.log('loading discord events');
const discordEvents = fs.readdirSync(`./events/discord`);
for (const file of discordEvents) {
	const {default: event} = await import(`./events/discord/${file}`); // grabs teh default export
	client.on(file.split(".")[0], event.bind(null, client)); // removes the .js
}

// process tts commands one at a time
const processQueue = async () => {
	if (activeQueue) return; // so the queue is not processed multiple times at once
	activeQueue = true;

	// process commands untill empty
	while (commandQueue.length > 0) {
		const interaction = commandQueue.shift();

		try {
			switch (interaction.commandName) {
				case 'annoy':
					await annoy(interaction);
					break;
				case 'query':
					await query(interaction);
					break;
				case 'ttm':
					await ttm(interaction);
					break;
			}
		}
		catch (error) {
			console.error('error processing command ', interaction.commandName, " error: ", error);
			await interaction.editReply('An error occurred while processing your command.');
		}
	}
	activeQueue = false;
}

// listen for commands
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	// defer reply to prevent timeout (for 15 minutes)
	await interaction.deferReply();

	console.log('Registered command: ', interaction.commandName, ' from ', interaction.user.tag);

	// add interaction to queue
	commandQueue.push(interaction);
	processQueue();
});

client.login(process.env.TOKEN);