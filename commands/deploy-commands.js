// deploy-commands.js
import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { ALL_COMMANDS } from './commands.js';

import 'dotenv/config';
dotenv.config({ path: '../.env' });

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering global commands...');
    await rest.put(
      Routes.applicationCommands(process.env.APP_ID),
      { body: ALL_COMMANDS }
    );
    console.log('Successfully registered global commands!');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
})();