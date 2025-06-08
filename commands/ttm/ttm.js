//ttm (text to michael)
import path from 'node:path';
import 'dotenv/config';
import { AttachmentBuilder } from 'discord.js';
import { spawn } from 'node:child_process';
import { archiveWav } from '../../utils';

const CHARACTER_LIMIT = 150;

const WAVPATH = path.join(process.env.TEMP_DIR, 'ttm.wav');

export const ttm = async (interaction) => {

    const sender = interaction.user.tag; // or .username
    const message = interaction.options.getString('text'); //get message

    console.log("ttm request from: ", sender, ": " , message);

    if (message.length > CHARACTER_LIMIT) { //over max character limit
        console.log('message was to long');
        await interaction.editReply('no long stuff please, ' + CHARACTER_LIMIT + ' characters max');
        return;
    } else {   
        // Run the python synthesis script
        console.log('starting synthesis script')
        await new Promise((resolve, reject) => {
            const ttsProcess = spawn('python3', ['commands/ttm/synthesize.py', message]);
            
            // print console output from python script
            ttsProcess.stdout.on('data', (data) => {
                console.log(`[python] ${data}`);
            });
            
            // print errors from python script
            ttsProcess.stderr.on('data', (data) => {
                console.error(`[python error] ${data}`);
            });
            
            // handel closing of the script
            ttsProcess.on('close', (code) => {
                if (code === 0) resolve();
                else reject(new Error('TTS process exited with code ' + code))
            });
        });
    }
        
    // reply with the file
    // TODO log the files personally
    const file = new AttachmentBuilder(WAVPATH);
    await interaction.editReply({
        content: '',
        files: [file]
    })

    // archive the wave file
    archiveWav(WAVPATH);

    console.log('ttm successfully completed');
};