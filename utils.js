import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Moves a WAV file to the archive folder and renames it to the date and time
 * @param {string} filePath - full filepath to wave file
 */
export const archiveWav = async (wavPath) => {
    try {
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-');
        const fileName = `${timestamp}.wav`

        await fs.rename(wavPath, path.join(process.env.ARCHIVE_DIR, fileName));

    } catch (error) {
        console.error('Error archiving wav file:', error);
    }
}