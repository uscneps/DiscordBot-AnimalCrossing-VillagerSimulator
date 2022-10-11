const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies givin bot description !'),
    async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTitle('Animal Crossing Villager Discord Simulator')
            .setDescription('HI! I am a NOT-OFFICIAL bot created by @Tokyo Swap#5768 for fun and learning purposes, that can do some basic stuff that simulate animal crossing villager. I am still in development if you wanna contribute text me 🌻 !')
            .setFooter({ text: '⚠️ : Animal Crossing[a] is a social simulation video game series developed and published by Nintendo. The series was conceptualized and created by Katsuya Eguchi and Hisashi Nogami. ' });
        interaction.reply({ embeds: [exampleEmbed] });
    },
};

