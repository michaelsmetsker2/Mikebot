import fs from 'node:fs/promises';

export const query = async (interaction) => {
    try {
        const filePath = './responces.txt'
        const outpath = './temp/query.txt'

        const data = await fs.readFile(filePath, 'utf-8');
        const lines = data.split(/\r?n/).filter(line => line.trim() !== '');

        const randomLine = lines[Math.floor(Math.random() * lines.length)];

        await fs.writeFile(outpath, randomLine, 'utf-8');
        await interaction.reply('test') 
    } catch (error) {
        console.error(error);
        await interaction.reply('sumthin bad happened');
    }
};