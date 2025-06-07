/**
 * @fileoverview
 * Main file of mikebot, handles command activations and initializing the bot
 * 
 * TODO see if mikebot is in the server, if not send an ephemeral message,
 * if it is send it publicly
 */

import { Client, GatewayIntentBits, Events } from 'discord.js';
import { annoy } from './commands/annoy/annoy.js';
import { query } from './commands/query/query.js';
import { ttm } from './commands/ttm/ttm.js';
import 'dotenv/config';

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds //lets the bot join servers
    ]
});

const commandQueue = []; //queue of tts command calls so that they dont run at the same time
let activeQueue = false;

//process tts commands one at a time
const processQueue = async () => {
  if (activeQueue) return; //so the queue is not processed multiple times at once
  activeQueue = true;

  //process commands untill empty
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

//client is ready
client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});

//listen for commands
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  //defer reply to prevent timeout (for 15 minutes)
  await interaction.deferReply();
  
  console.log('Registered command: ', interaction.commandName, ' from ', interaction.user.tag);

  //add interaction to queue
  commandQueue.push(interaction);
  processQueue();

});

client.login(process.env.TOKEN);