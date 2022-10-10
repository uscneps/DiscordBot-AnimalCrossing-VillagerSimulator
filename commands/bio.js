const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bio')
        .setDescription('Replies givin bot description !'),
    async execute(interaction) {
        await interaction.reply('HI! I am a bot created by @Tokyo Swap#5768 for fun and learning purposes, that can do some basic stuff that simulate animal crossing villager. I am still in development');
    },
};
