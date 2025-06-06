//command that plays a string on my pc via tts
// TODO: the tts will delete the file after it has been read. use this to see if it was read correctly
import fs from 'node:fs/promises';
import { sleep } from '../../utils.js'
import { TEMP_DIR } from '../../config.js';
import path from 'path';

const ttsPath = path.join(TEMP_DIR, 'tts.txt');

export const annoy = async (interaction) => {
  try {
    const message = interaction.options.getString('message');
    const sender = interaction.user.tag; // or .username

    if (message.length > 250) {
      await interaction.reply('fuck you i\'m not listening to all of that');
      return;
    }

    console.log(sender, 'says:', message);

    await fs.writeFile(ttsPath, message);
    console.log('file write successful');

    await interaction.reply('Message delivered, it has been done!');
  } catch (err) {
    console.error('Error in annoy command:', err);
    await interaction.reply('Error delivering message');
  }
};