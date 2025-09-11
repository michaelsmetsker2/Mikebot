// deploy-commands.js
import { REST, Routes, SlashCommandBuilder } from 'discord.js';

//TODO for loop to import all commands from the command directory

import dotenv from 'dotenv';
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