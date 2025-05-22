// index.js
import { Client, GatewayIntentBits, Events } from 'discord.js';
import { annoy } from './annoy.js';
import 'dotenv/config';

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

});

client.login(process.env.TOKEN);