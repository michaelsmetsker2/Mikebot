/**
 * Entry point, initializes all commands and event listeners, starts the bot as well.
 */

import 'dotenv/config';

import path from 'path';
import { readdirSync, statSync } from "fs";

import { Client, GatewayIntentBits, Partials, Collection} from 'discord.js';

import { Player, GuildQueueEvent } from 'discord-player';

import { DefaultExtractors } from '@discord-player/extractor'
import { YoutubeiExtractor } from "discord-player-youtubei"
import { SoundcloudExtractor } from "discord-player-soundcloud";
import { YoutubeSabrExtractor } from 'discord-player-googlevideo';
 

// Discord bot permissions
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

// Initialize discord-player
const  player = new Player(client);

// Load extractors
//await player.extractors.loadMulti(DefaultExtractors);
await player.extractors.register(SoundcloudExtractor, {});
//await player.extractors.register(YoutubeiExtractor, {}) //depriciated
//await player.extractors.register(YoutubeSabrExtractor, {});

client.MessageCommands = new Collection();
client.SlashCommands = new Collection();

// Registers Discord events
console.log('loading discord events');
const discordEvents = readdirSync(`./events/discord`);
for (const file of discordEvents) {
    const eventModule = await import(`./events/discord/${file}`);
    const event = eventModule.default; // <-- grab the default export
    client.on(file.split(".")[0], event.bind(null, client));
}

// Registers Discord-player events
console.log('loading discord-player events');
const playerEvents = readdirSync(`./events/discord-player`);
for (const file of playerEvents) {
    const eventModule = await import(`./events/discord-player/${file}`);
    const event = eventModule.default; // <-- grab default export
    const eventName = file.split(".")[0];
    player.events.on(eventName, event); // <-- pass handler directly
}

// Registering slash commands
console.log('Loading Slash Commands');
const files = readdirSync(`./commands`);
for (const file of files) {
    const fullPath = path.join('./commands', file);

    // Only import JS files, skip directories
    if (statSync(fullPath).isFile() && file.endsWith('.js')) {
        const commandModule = await import(`./commands/${file}`);
        const command = commandModule.default;
        client.SlashCommands.set(command.name, command);
    }
}

client.login(process.env.TOKEN);