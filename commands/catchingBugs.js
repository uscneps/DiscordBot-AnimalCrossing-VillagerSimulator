const { request } = require('undici');
// eslint-disable-next-line no-unused-vars
const { SlashCommandBuilder, EmbedBuilder, CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catchingbugs')
        .setDescription('catch a bug'),
    /**
     * @param {CommandInteraction} interaction
     * @param {any} data
     */
    async execute(interaction, data) {
        if (interaction.client.cooldowns[interaction.user.id][interaction.command.name] > Date.now()) {
            interaction.reply('You can only use this command 1 time every 30 minutes!');
        }
        else {
            interaction.client.cooldowns[interaction.user.id][interaction.command.name] = (Date.now() + 1800000);

            const bugFound = Math.floor(Math.random() * 81);
            const bug = await request(`https://acnhapi.com/v1/bugs/${bugFound}`);
            const { image_uri, name, price, icon_uri } = await getJSONResponse(bug.body);
            const description = await getJSONResponse(bug.body);

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
                
            if (!data.inventory[name['name-USen']]) data.inventory[name['name-Usen']] = 1;
            else data.inventory[name['name-USen']]++;

            await data.save();
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
