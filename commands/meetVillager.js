const { request } = require('undici');
// eslint-disable-next-line no-unused-vars
const { SlashCommandBuilder, EmbedBuilder, CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meetvillagers')
        .setDescription('speak with a villager'),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, data) {
        const chance = Math.floor(Math.random() * 100);

        const villagerFound = Math.floor(Math.random() * 414);
        const villager = await request(`https://acnhapi.com/v1/villagers/${villagerFound}`);
        const { image_uri, name, icon_uri, species, gender, birthday } = await getJSONResponse(villager.body);
        const description = await getJSONResponse(villager.body);
        
        const villagerEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(name['name-USen'])
            .setDescription(`${description['catch-phrase']} !`)
            .setThumbnail(icon_uri)
            .addFields(
                { name: 'Species', value: `${species}`, inline: true },
                { name: 'Gender', value: `${gender}`, inline: true },
                { name: 'Birthday', value: `${birthday}`, inline: true },
            )
            .setImage(image_uri)
            .setFooter({ text: name['name-JPja'] });
        interaction.reply({ embeds: [villagerEmbed] });

        if (chance <= 33) {
            if (interaction.client.cooldowns[interaction.user.id]['painting'] > Date.now()) return;
            else interaction.client.cooldowns[interaction.user.id]['painting'] = (Date.now() + 180000);

            const paintingFound = Math.floor(Math.random() * 43);
            const painting = await request(`http://acnhapi.com/v1/art/${paintingFound}`);
            const body = await getJSONResponse(painting.body);

            const paintingEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`${name['name-USen']} just gave you ${body['name']['name-USen']}`)
                .setDescription(body['museum-desc'])
                .setThumbnail(body['image_uri'])
                .addFields(
                    { name: 'Bells Price', value: `${body['sell-price']}`, inline: true },
                    { name: 'Japanese Name', value: `${name['name-JPja']}`, inline: true },
                )
                .setImage(body['image_uri']);

            interaction.editReply({ embeds: [villagerEmbed, paintingEmbed] });

            if (!data.inventory[body['name']['name-USen']]) data.inventory[body['name']['name-USen']] = 1;
            else data.inventory[body['name']['name-USen']]++;

            await data.save();
        }

        interaction.client.cooldowns[interaction.user.id]['painting'] = (Date.now() + 180000);
    },
};

async function getJSONResponse(body) {
    let fullBody = '';
    for await (const data of body) {
        fullBody += data.toString();
    }
    return JSON.parse(fullBody);
}

