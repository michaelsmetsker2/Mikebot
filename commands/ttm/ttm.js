//ttm or text to michael
import path from 'node:path';
import 'dotenv/config';
import { AttachmentBuilder } from 'discord.js';
import { spawn } from 'child_process'

const WAVPATH = path.join(process.env.TEMP_DIR, 'ttm.wav');
const CHARACTER_LIMIT = 150;

export const ttm = async (interaction) => {
    try {
        const sender = interaction.user.tag; // or .username
        const message = interaction.options.getString('text'); //get message
        console.log("ttm request from: ", sender, ": " , message);

        if (message.length > CHARACTER_LIMIT) { //over max character limit
            await interaction.reply('no long stuff please, ' + CHARACTER_LIMIT + ' characters max');
            return;
        }
        
        await interaction.deferReply();
        // Run the python synthesis script
        await new Promise((resolve, reject) => {
            const ttsProcess = spawn('python3', ['commands/ttm/synthesize.py', message]);

            ttsProcess.stdout.on('data', (data) => {
                console.log(`[python] ${data}`);
            });

            ttsProcess.stderr.on('data', (data) => {
                console.error(`[python error] ${data}`);
            });

            ttsProcess.on('close', (code) => {
                if (code === 0) resolve();
                else reject(new Error('TTS process exited with code ' + code))
            });
        });

        const file = new AttachmentBuilder(WAVPATH);
        await interaction.editReply({
            content: '',
            files: [file]
        })

        console.log("query success, from: ", sender)
    } catch (error) {
        console.error(error);
        await interaction.editReply('sumthin bad happened');
    }
};