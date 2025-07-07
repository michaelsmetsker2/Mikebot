/**
 * @fileoverview
 * command that plays a string on my pc via tts
 * 
 * TODO: the tts will delete the file after it has been read. use this to see if it was read correctly
*/
import fs from 'node:fs/promises';
import path from 'path';
import 'dotenv/config';
import { spawn } from 'child_process';

const CHARACTER_LIMIT = 250; // Max characters for the message

const TEMP_DIR = process.env.TEMP_DIR

const SUPPORTED_EXTENSIONS = ['.wav', '.mp3', '.m4a', '.aac', '.ogg', '.flac'];


// Text file that will be read by an external TTS system on the client machine
// Generally the temp directory should by in a shared location
const ttsPath = path.join(TEMP_DIR, 'tts.txt');

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
    await interaction.editReply('Message has been sent!'); // Todo: check if file has been deleted
    
    console.log('Annoy message parsed and written to file.');
    console.log(); // blank line in between commands
  }
};

export const annoyFile = async(message) => {
  console.log('received annoyfile request');

  for (const attachment of message.attachments.values()) { // could contain multiple files

    let audioFilePath = attachment.url; // files url
    const extension = path.extname(attachment.name).toLowerCase(); // files extension
    
    console.log(extension);

    if (!SUPPORTED_EXTENSIONS.includes(extension)) {
      console.error('Unsupported file format');
      await message.reply({content: 'Unsupported file format'});
      return;
    }
    
    try { //download the file
      const response = await fetch(audioFilePath);
      if (!response.ok) {
        throw new Error('Fetch failed')
      }
      
      const tempFilePath = path.join(TEMP_DIR, `tempAudio${extension}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      await fs.writeFile(tempFilePath, buffer);

      const duration = await new Promise((resolve, reject) => {
        const probe = spawn ('ffprobe', [
          '-v', 'error',
          '-show_entries', 'format=duration',
          '-of', 'default=noprint_wrappers=1:nokey=1',
          tempFilePath
        ]);

        let output = '';
        probe.stdout.on('data', chunk => output += chunk);

        probe.stderr.on('data', err => console.error('ffprobe error:', err.toString()));

        probe.on('close', code => {
          if (code !== 0) return reject(new Error('ffprobe failed or invalid file'));
          const secs = parseFloat(output.trim());
          if (isNaN(secs)) return reject(new Error('Could not parse duration'));
          resolve(secs);
        });
      });

      if (duration > 15) { //check duration
        await message.reply({ content: 'file duration is over 15 seconds'});
        console.error('file length to large');
        await fs.unlink(tempFilePath);
        return;
      }
      console.log('file validated');
      
      const renamedPath = path.join(TEMP_DIR, `annoy${extension}`);
      await fs.rename (tempFilePath, renamedPath);

      await message.reply({ content: `file delivered successfully`});
      console.log('annoyfile successfully sent');
      console.log('');
      
    } catch (err) {
      console.error('failed to process file ', err)
      await message.reply({ content: `Failed to Process file`})
    }
  }
};