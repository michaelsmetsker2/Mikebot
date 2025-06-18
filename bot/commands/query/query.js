/**
 * @fileoverview
 * This is a genericised command, as in it can be called from both a slashcommand and tagging the bot saying "is this real"
 * it will handle the interactions slightly differently but with the same results.
 * 
 * It will respond with a wav file of tts reading out a random line from the responses text file
 */


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

export const query = async (input) => {
    const sender = input.user?.tag || input.author?.tag || 'Unknown';
    console.log('processing query from: ', sender);

    const data = await fs.readFile(RESPONSES_PATH, 'utf-8');
    const lines = data.split(/\r?\n/).filter(line => line.trim() !== ''); // Split the file int lines
    const randomLine = lines[Math.floor(Math.random() * lines.length)]; // Pick a random line

    await fs.writeFile(QUERY_PATH, randomLine, 'utf-8'); // Write random line to output file
    await sleep(450); //gives ample time for the external TTS engine to process the file and writ the output
    const file = new AttachmentBuilder(WAV_PATH); //replies with file written by tts engine
    
    if (input.editReply) { // The reply has only been defered if it was called from a slash command
        await input.editReply({ conten: '', files: [file] })
    } else {
        await input.reply({ content: '', files: [file] })
    }

    //delete temp files
    await fs.unlink(QUERY_PATH);
    await fs.unlink(WAV_PATH);
    
    console.log('query successfully completed');
    console.log(); // blank linke in between commands
};