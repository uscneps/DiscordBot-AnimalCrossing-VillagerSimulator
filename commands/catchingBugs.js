const { request } = require('undici');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const cooldown = new Set();
const userInventary = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catchingbugs')
        .setDescription('catch a bug'),
    async execute(interaction) {
        if (cooldown.has(interaction.user.id)) {
            interaction.reply('You can only use this command 1 time every 30 minutes!');
        }
        else {
            if (!userInventary.has(interaction.user.id)) {
                userInventary.set(interaction.user.id, []);
            }
            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, 1800000);
            const bugFound = Math.floor(Math.random() * 81);
            const bug = await request(`https://acnhapi.com/v1/bugs/${bugFound}`);
            const { image_uri, name, price, icon_uri } = await getJSONResponse(bug.body);
            // acccess catch-phrase
            const Accessdescription = await request(`https://acnhapi.com/v1/bugs/${bugFound}`);
            const description = await getJSONResponse(Accessdescription.body);
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(name['name-USen'])
                .setDescription(description['catch-phrase'])
                .setThumbnail(icon_uri)
                .addFields(
                    { name: 'Bells Price', value: `${price}`, inline: true },
                    { name: 'Japanese Name', value: `${name['name-JPja']}`, inline: true },
                )
                .setImage(image_uri)
                .setFooter({ text: description['museum-phrase'] });
            userInventary.get(interaction.user.id).push(name['name-USen']);
            console.log(userInventary.get(interaction.user.id));
            interaction.reply({ embeds: [exampleEmbed] });
        }
    },
};

async function getJSONResponse(body) {
    let fullBody = '';
    for await (const data of body) {
        fullBody += data.toString();
    }
    return JSON.parse(fullBody);
}

module.exports.userInventary = userInventary;

