import fs from 'fs';

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Asynchronousely checks if a file is locked
 * @param {string} filePath - Full filepath to file
 * @returns {Promise<boolean>} - true if file is locked, false otherwise
*/
export const isFileLocked = async (filePath) => {
    try {
        console.log('checking: ', filePath);
        const file = fs.openSync(filePath, 'r+');
        fs.closeSync(fd); // If successful, close it immediately
        return false; //file not locked
    }
    catch {
        return true;   //file locked
    }
}