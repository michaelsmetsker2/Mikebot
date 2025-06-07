import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AttachmentBuilder } from 'discord.js';

import 'dotenv/config';
import { sleep } from '../../utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const responsesPath = path.join(__dirname, 'responses.txt');
const outpath = path.join(process.env.TEMP_DIR, 'query.txt');
const wavPath = path.join(process.env.TEMP_DIR, 'queryOutput.wav');

export const query = async (interaction) => {
    try {
        const sender = interaction.user.tag; // or .username
        const data = await fs.readFile(responsesPath, 'utf-8');
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


