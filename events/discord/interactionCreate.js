/**
 * emits whenever a slash command is ran
 * this file determins how and if the command should be run
 */

import 'dotenv/config';
import { useQueue, useMainPlayer } from 'discord-player';

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
			console.error('error processing command ', interaction.commandName, " error: ", error.message);
			await interaction.editReply(`An error occurred while processing your command. error: ${error.message}`);
		}
	}
	activeQueue = false;
}

// listen for commands
export default async (client, interaction) => {
	if (!interaction.isChatInputCommand()) return;
	
	// Check command validity
	const command = client.SlashCommands.get(interaction.commandName);
	if (!command) return;
	
	console.log('Registered command: ', interaction.commandName, ' from ', interaction.user.tag);
	
	if (!command.inVoiceChannel) {
		// It's not a music command and should be enqued
		
		// defer reply to prevent timeout (for 15 minutes), could cause errors
		await interaction.deferReply();
		
		// add interaction to queue
		commandQueue.push(interaction);
		processQueue(client);
	} else {
		// It is a music command

		if (!interaction.member || !interaction.member.voice || !interaction.member.voice.channel) {
			await interaction.reply("You need to be in a vc to use this");
			return;
		}
		
		const player = useMainPlayer();
		const data = {
			guild: interaction.guild,
		};
		
		// Make sure music is playing if the command requires it
		if (command.playing) {
			const queue = useQueue(data.guild); // get the current queue
			if (!queue || !queue.isPlaying()) { // no queue or no current track
				await interaction.reply('You have to play something to use this command');
				return;
			}
		}
		try {
			await player.context.provide(data, () => command.execute(interaction));
		} catch (error) {
			// In most cases the command will handle the error itselfu
    		console.error(error);
		}
	}
};