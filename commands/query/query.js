import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AttachmentBuilder } from 'discord.js';
import { sleep } from '../../utils.js';

import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const RESPONSES_PATH = path.join(__dirname, 'responses.txt'); // Text file full of all possible responces.
const QUERY_PATH = path.join(process.env.TEMP_DIR, 'query.txt'); // Text file to feed external TTS engine.
const WAV_PATH = path.join(process.env.TEMP_DIR, 'queryOutput.wav'); // File output from external TTS engine.

export const query = async (interaction) => {
    
    const sender = interaction.user.tag; // or .username
    console.log('processing query from: ', sender);

    const data = await fs.readFile(RESPONSES_PATH, 'utf-8');
    const lines = data.split(/\r?\n/).filter(line => line.trim() !== ''); // Split the file int lines
    const randomLine = lines[Math.floor(Math.random() * lines.length)]; // Pick a random line

    await fs.writeFile(QUERY_PATH, randomLine, 'utf-8'); // Write random line to output file

    
    //gives ample time for the external TTS engine to process the file and writ the output
    await sleep(450);

    //replies with file written by tts engine
    const file = new AttachmentBuilder(WAV_PATH);
    
    //delete temp files
    await fs.unlink(QUERY_PATH);
    await fs.unlink(WAV_PATH);
    
    await interaction.editReply({
        content: '',
        files: [file]
    })
    
    console.log('query successfully completed');
};


