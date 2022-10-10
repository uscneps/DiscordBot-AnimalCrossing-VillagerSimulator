const { request } = require('undici');
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('seacreature')
        .setDescription('Replies givin a random seacreature cat'),
    async execute(interaction) {
        const seaCreature = await request('https://acnhapi.com/v1/fish/1');
        const { image_uri, name } = await getJSONResponse(seaCreature.body);
        await interaction.reply({ content: `${name['name-USen']}`, files: [image_uri] });
    },
};

async function getJSONResponse(body) {
    let fullBody = '';
    for await (const data of body) {
        fullBody += data.toString();
    }
    return JSON.parse(fullBody);
}

