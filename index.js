/**
 * @fileoverview
 * Entry point and brings the bot and event listeners online
 */

import path from 'path';
import { readdirSync, statSync } from "fs";
import { Client, GatewayIntentBits, Partials, Collection} from 'discord.js';

import { DisTube } from "distube";
import { YtDlpPlugin } from "@distube/yt-dlp";
import SoundCloudPlugin from "@distube/soundcloud";
import { SpotifyPlugin } from "@distube/spotify";
import { DeezerPlugin } from "@distube/deezer";
import { DirectLinkPlugin } from "@distube/direct-link";
import { FilePlugin } from "@distube/file";

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

// Create DisTube object
const distube = new DisTube(client, {
	plugins: [
		new SoundCloudPlugin(),
		new SpotifyPlugin(),
		new DeezerPlugin(),
		new DirectLinkPlugin(),
		new FilePlugin(),
		//new YtDlpPlugin({ update: false })
	],
	emitAddListWhenCreatingQueue: true,
	emitAddSongWhenCreatingQueue: true,
});

client.MessageCommands = new Collection();
client.SlashCommands = new Collection();

// Registers Discord events
console.log('loading discord events');
const discordEvents = readdirSync(`./events/discord`);
for (const file of discordEvents) {
    const eventModule = await import(`./events/discord/${file}`);
    const event = eventModule.default; // <-- grab the default export
    client.on(file.split(".")[0], event.bind(null, client, distube));
}

// Registers Distube events
console.log('loading distube events');
const distubeEvents = readdirSync(`./events/distube`);
for (const file of distubeEvents) {
    const eventModule = await import(`./events/distube/${file}`);
    const event = eventModule.default; // <-- grab default export
    const eventName = file.split(".")[0]; // e.g., playSong.js -> "playSong"
    distube.on(eventName, event); // <-- pass handler directly
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