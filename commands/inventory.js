const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { userInventary } = require('./catchingBugs.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Replies givin items owned by user'),
    async execute(interaction) {
        if (!userInventary.has(interaction.user.id || userInventary.get(interaction.user.id).length === 0)) {
            interaction.reply('you don\'t have any items');
            userInventary.set(interaction.user.id, []);
        }
        else {
            const userItems = userInventary.get(interaction.user.id);
            const exampleEmbed = new EmbedBuilder()
                .setColor(0xFFFF00)
                .setTitle('Inventary')
                .setDescription(`${userItems.join('\n')}`)
                .setThumbnail('https://media0.giphy.com/media/ZCHNyCrwrfIqRAPWK9/200w.gif?cid=82a1493b0n39j0t9gi0015gem8b893clpdfl2wwsb64kvrwf&rid=200w.gif&ct=s');
            interaction.reply({ embeds: [exampleEmbed] });
        }
    },
};
