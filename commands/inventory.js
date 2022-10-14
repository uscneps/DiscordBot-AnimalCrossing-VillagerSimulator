const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Replies givin items owned by user'),
    async execute(interaction, data) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0xFFFF00)
            .setTitle('Inventary')
            .setThumbnail('https://media0.giphy.com/media/ZCHNyCrwrfIqRAPWK9/200w.gif?cid=82a1493b0n39j0t9gi0015gem8b893clpdfl2wwsb64kvrwf&rid=200w.gif&ct=s');

        for (const item of data.inventory) {
            exampleEmbed.addFields({ name: item, value: data.inventory[item] });
        }
        interaction.reply({ embeds: [exampleEmbed] });
    },
};
