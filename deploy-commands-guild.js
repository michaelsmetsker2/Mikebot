//locally deploy commands for testing
import dotenv from 'dotenv';
dotenv.config();

import { REST } from 'discord.js';
import { Routes } from 'discord.js';

import { ALL_COMMANDS } from './commands.js';

const CLIENT_ID = process.env.APP_ID || '1375015828612714556';
const GUILD_ID = process.env.GUILD_ID || '1375029200582344786';

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
