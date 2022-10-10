const { request } = require('undici');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomcat')
        .setDescription('Replies givin a random cat'),
    async execute(interaction) {
        const catResult = await request('https://aws.random.cat/meow');
        const { file } = await getJSONResponse(catResult.body);
        await interaction.reply('this is a message', { files: [file] });
    },
};

async function getJSONResponse(body) {
    let fullBody = '';
    for await (const data of body) {
        fullBody += data.toString();
    }
    return JSON.parse(fullBody);
}

