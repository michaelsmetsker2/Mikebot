import fs from 'node:fs/promises';

export const annoy = async (interaction) => {
  try {
    const message = interaction.options.getString('message');
    console.log('annoy command received:', message);

    fs.writeFile('./tts.txt', message);
    console.log('file write successful');

    await interaction.reply('Message delivered, it has been done!');
  } catch (err) {
    console.error('Error in annoy command:', err);
    await interaction.reply('Error delivering message');
  }
};