const { request } = require('undici');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catchingfish')
        .setDescription('find a fish to catch'),
    async execute(interaction, data) {
        if (interaction.client.cooldowns[interaction.user.id][interaction.command.name] > Date.now()) {
            interaction.reply('You can only use this command 1 time every 30 minutes!');
        }
        else {
            interaction.client.cooldowns[interaction.user.id][interaction.command.name] = (Date.now() + 1800000);

            const fishFound = Math.floor(Math.random() * 81);
            const seaCreature = await request(`https://acnhapi.com/v1/fish/${fishFound}`);
            const { image_uri, name, price, icon_uri } = await getJSONResponse(seaCreature.body);
            // acccess catch-phrase
            const Accessdescription = await request(`https://acnhapi.com/v1/fish/${fishFound}`);
            const description = await getJSONResponse(Accessdescription.body);
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
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

