//honks

import { spawn } from 'node:child_process';
import path from 'node:path';

const HONK_FILE = path.resolve('./honk.wav');

export const honk = async (interaction) => {
    try {
        const DEST_IP = process.env.EJEW_IP; // xxx.xxx.x.xxx
        const DEST_PORT = process.env.EJEW_PORT; // xxxx

        const ffmpegArgs = [
            '-re',                      // Real-time file reading
            '-f', 'wav',                // input format
            '-i', 'pipe:0'
        ]


        await interaction.reply({
            content: 'A horn has been honked, try listening carefully',
            ephemeral: true
        })
    }
    catch {
        console.error(error)
        await interaction.reply('oopsy doopsie, a fucky wucky happened!')
    }
}