//command that plays a string on my pc via tts
// TODO: the tts will delete the file after it has been read. use this to see if it was read correctly
import fs from 'node:fs/promises';
import path from 'path';
import 'dotenv/config';

const CHARACTER_LIMIT = 250; // Max characters for the message

// Text file that will be read by an external TTS system on the client machine
// Generally the temp directory should by in a shared location
const ttsPath = path.join(process.env.TEMP_DIR, 'tts.txt');

export const annoy = async (interaction) => {
  const message = interaction.options.getString('message'); // Message attatched to the command
  const sender = interaction.user.tag; // or .username
  
  console.log(sender, 'attempts to annoy you with: ', message);

  if (message.length > CHARACTER_LIMIT) { // Invalid message
    console.log(sender, '\'s message was to long');
    await interaction.editReply('fuck you i\'m not listening to all of that, (over ', CHARACTER_LIMIT, ' characters)');
    return;
  } else { // Valid message
 
    await fs.writeFile(ttsPath, message); //write to file
    await interaction.editReply('Annoy command is temporarily disabled, an update is in the words!'); // Todo: check if file has been deleted
    
    console.log('Annoy message parsed and written to file.');
    console.log(); // blank linke in between commands
  }
};