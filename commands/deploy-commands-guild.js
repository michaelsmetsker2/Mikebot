//locally deploy commands for testing

import { REST } from 'discord.js';
import { Routes } from 'discord.js';

dotenv.config({ path: '../.env' });

import { ALL_COMMANDS } from './commands.js';

const CLIENT_ID = process.env.APP_ID;;
const GUILD_ID = process.env.GUILD_ID;

async function deployGuildCommands() {
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    console.log(`Registering guild commands for guild ID ${GUILD_ID}...`);
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: ALL_COMMANDS }
    );
    console.log('Successfully registered guild commands!');
  } catch (error) {
    console.error('Error registering guild commands:', error);
  }
}

deployGuildCommands();