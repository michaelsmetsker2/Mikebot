import { Events, Client } from 'discord.js';

import annoy from '../../commands/annoy.js';
import query from '../../commands/query.js';
import ttm from '../../commands/annoy.js';

import 'dotenv/config';

const commandQueue = []; // queue of tts command calls so that they dont run at the same time
let activeQueue = false;

// process tts commands one at a time
const processQueue = async (client) => {
	if (activeQueue) return; // so the queue is not processed multiple times at once
	activeQueue = true;

	// process commands until empty
	while (commandQueue.length > 0) {
		const interaction = commandQueue.shift();
		const command = client.SlashCommands.get(interaction.commandName);

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error('error processing command ', interaction.commandName, " error: ", error);
			await interaction.editReply('An error occurred while processing your command.');
		}
	}
	activeQueue = false;
}

// listen for commands
export default async (client, interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.SlashCommands.get(interaction.commandName);
	//invalid command
	if (!command) return;

	console.log('Registered command: ', interaction.commandName, ' from ', interaction.user.tag);
	
	if (command.inVoiceChannel) {

		console.log('placeholder');
	} else {
		
		// defer reply to prevent timeout (for 15 minutes)
		await interaction.deferReply();

		// add interaction to queue
		commandQueue.push(interaction);
		processQueue(client);
	}
};
