const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bio')
        .setDescription('Replies givin bot description !'),
    async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Animal Crossing Villager Discord Simulator')
            .setDescription('HI! I am a bot created by @Tokyo Swap#5768 for fun and learning purposes, that can do some basic stuff that simulate animal crossing villager. I am still in development')
            .setFooter({ text: 'if you wanna contribute text me 🌻 ! ' });
        interaction.reply({ embeds: [exampleEmbed] });
    },
};

