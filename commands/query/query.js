import fs from 'node:fs/promises';
import { AttachmentBuilder } from 'discord.js';
import { sleep } from '../utils.js';

export const query = async (interaction) => {
    try {
        const sender = interaction.user.tag; // or .username
        const filePath = './responces.txt'
        const outpath = './temp/query.txt'
        const wavPath = './temp/queryOutput.wav'

        const data = await fs.readFile(filePath, 'utf-8');
        const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');

        const randomLine = lines[Math.floor(Math.random() * lines.length)];

        await fs.writeFile(outpath, randomLine, 'utf-8');


        await sleep(50);

        const file = new AttachmentBuilder(wavPath);

        await sleep(200);
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