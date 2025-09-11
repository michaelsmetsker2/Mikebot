/**
 * @fileoverview
 * Entry point and brings the bot and event listeners online
 */

import { readdirSync } from "fs";
import { Client, GatewayIntentBits, Partials, Collection} from 'discord.js';

import { DisTube } from "distube";
import { YouTubePlugin } from "@distube/youtube";
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
    new YouTubePlugin(),
    new SoundCloudPlugin(),
    new SpotifyPlugin(),
    new DeezerPlugin(),
    new DirectLinkPlugin(),
    new FilePlugin(),
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
    client.on(file.split(".")[0], event.bind(null, client));
}

// Registers Distube events
console.log('loading distube events');
const distubeEvents = readdirSync(`./events/distube`);
for (const file of distubeEvents) {
	const eventModule = await import(`./events/distube/${file}`);
	const event = eventModule.default; // <-- grab the default export
    distube.on(file.split(".")[0], event.bind(null, client));
}

client.login(process.env.TOKEN);