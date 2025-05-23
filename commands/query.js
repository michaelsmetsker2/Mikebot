import fs from 'node:fs/promises';

export const query = async (interaction) => {
    try {
        const filePath = 'Z:\projects\Mikebot\responces.txt'
        const outpath = ''

        const data = await fs.readFile(filePath, 'utf-8');
        const lines = data.split(/\r?n/).filter(line => line.trim() !== '');

        const randomLine = lines[Math.floor(Math.random() * line.length)];

        await fs.writeFile(outpath, randomLine, 'utf-8');
        await interaction.reply('test') 
    } catch (error) {
        console.error(errpr);
        await interaction.reply('sumthin bad happened');
    }
};