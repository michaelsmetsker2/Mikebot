//ttm or text to michael

//import fs from 'node:fs/promises';
import path from 'node:path';
//import { fileURLToPath } from 'node:url';
import { AttachmentBuilder } from 'discord.js';

import { TEMP_DIR } from '../../config.js';
//import { sleep } from '../../utils.js';

const wavPath = path.join(TEMP_DIR, 'ttm.wav');

export const query = async (interaction) => {
    try {
        const sender = interaction.user.tag; // or .username
        const message = interaction.options.getString('text'); //get message
        console.log("ttm request from: ", sender, ": " , message);

        await interaction.deferReply();


        const file = new AttachmentBuilder(wavPath);

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


