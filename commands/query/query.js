import fs from 'node:fs/promises';
import path from 'node:path';

import { fileURLToPath } from 'node:url';
import { AttachmentBuilder } from 'discord.js';
import { sleep } from '../../utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const responcesPath = path.join(__dirname, 'responces.txt');
const outpath = path.join(__dirname, '../../temp/query.txt');
const wavPath = path.join(__dirname, '../../temp/queryOutput.wav');

export const query = async (interaction) => {
    try {
        const sender = interaction.user.tag; // or .username
        const data = await fs.readFile(responcesPath, 'utf-8');
        const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');

        const randomLine = lines[Math.floor(Math.random() * lines.length)];

        await fs.writeFile(outpath, randomLine, 'utf-8');

        await sleep(150);

        const file = new AttachmentBuilder(wavPath);

        await sleep(300);
        await interaction.reply({
            content: "",
            files: [file]
        }) 
        console.log("query success, from: ", sender)
    } catch (error) {
        console.error(error);
        await interaction.reply('sumthin bad happened');
    }
};


