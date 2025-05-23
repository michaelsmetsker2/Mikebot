import fs from 'node:fs/promises';

export const annoy = async (interaction) => {
  try {
    const message = interaction.options.getString('message');
    const sender = interaction.user.tag; // or .username

    if (message.length > 250) {
      await interaction.reply('fuck you i\'m not listening to all of that');
      return;
    }

    console.log(sender, 'says:', message);

    await fs.writeFile('./temp/tts.txt', message);
    console.log('file write successful');

    await interaction.reply('Message delivered, it has been done!');
  } catch (err) {
    console.error('Error in annoy command:', err);
    await interaction.reply('Error delivering message');
  }
};