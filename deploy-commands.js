import { REST, Routes } from 'discord.js';
import { readdirSync, statSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const commandsPath = './commands';
const commandFiles = readdirSync(commandsPath);

// Collect all commands
const commands = [];

for (const file of commandFiles) {
    const fullPath = path.join(commandsPath, file);

    // Only process JS files, skip directories
    if (statSync(fullPath).isFile() && file.endsWith('.js')) {
        const commandModule = await import(`./commands/${file}`);
        if (commandModule.command) {
            commands.push(commandModule.command);
        }
    }
}

// Register commands to a specific guild
const GUILD_ID = '1375605865700261999';

(async () => {
    try {
        console.log(`Registering ${commands.length} commands to guild ${GUILD_ID}...`);
        await rest.put(
            Routes.applicationGuildCommands(process.env.APP_ID, GUILD_ID),
            { body: commands }
        );
        console.log('Successfully registered guild commands!');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
})();
