// index.js
import { Client, GatewayIntentBits, Events } from 'discord.js';
import { annoy } from './commands/annoy.js';
import 'dotenv/config';
import { query } from './commands/query.js';

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  if (interaction.commandName === 'annoy') {
    await annoy(interaction);
  }
  else if (interaction.commandName === 'query') {
    await query(interaction);
  }

});

client.login(process.env.TOKEN);