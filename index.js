/**
 * @fileoverview
 * Main file of mikebot, handles command activations and initializing the bot
 */

import { Client, GatewayIntentBits, Events } from 'discord.js';
import { annoy } from './commands/annoy/annoy.js';
import { query } from './commands/query/query.js';
import 'dotenv/config';

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds //lets the bot join servers
    ]
});

const ttsQueue = []; //queue of tts command calls so that they dont run at the same time
let activeQueue = false;

//process tts commands one at a time
const processQueue = async () => {
  if (activeQueue) return;
  activeQueue = true;

  while (ttsQueue.length > 0) {
    const interaction = ttsQueue.shift();
    
    try {
      if (interaction.commandName === 'annoy') {
        await annoy(interaction);
      }
      else if (interaction.commandName === 'query') {
        await query(interaction);
      }
    }
    catch (error) {
      console.error('error processing a tts interation: ', error);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply('error while executing the commmand');
      }
    }
  }
  activeQueue = false;
}

client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'honk') {

  } else { //must be a tts command then+-
    ttsQueue.push(interaction);
    processQueue();
  }

});

client.login(process.env.TOKEN);