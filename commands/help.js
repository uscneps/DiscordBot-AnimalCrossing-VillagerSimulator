const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies givin bot commands !'),
    async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTitle('Bot Commands')
            .addFields({ name: '/bio', value: 'Replies givin bot description !' }, { name: '/help', value: 'Replies givin bot commands !' }, { name: '/catchingfish', value: 'Catch a fish every 30m !' }, { name: '/catchingbug', value: 'Catch a bug every 30m ' }, { name: '/inventory', value: 'Replies givin items owned by user' })
            .setThumbnail('https://i.pinimg.com/originals/38/64/36/386436f77be1cad1dada76ea35c6fb77.gif')
            .setFooter({ text: '⚠️ : Animal Crossing[a] is a social simulation video game series developed and published by Nintendo. The series was conceptualized and created by Katsuya Eguchi and Hisashi Nogami. ' });
        interaction.reply({ embeds: [exampleEmbed] });
    },
};


