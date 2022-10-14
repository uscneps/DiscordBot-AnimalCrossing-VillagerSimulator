const { Client, Collection, GatewayIntentBits } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const mongoose = require('mongoose');

class Bot extends Client {
    constructor() {
        super({ intents: [GatewayIntentBits.Guilds] });

        this.commands = new Collection();
        this.cooldowns = {};

        this.DBUser = require('./User');
        this.config = require('../config.json');

        this.DBConn = mongoose.connection;
    }

    async setCommands() {
        const cmdPath = path.join(process.cwd(), 'commands');
        const cmdFiles = fs.readdirSync(cmdPath).filter(f => f.endsWith('.js'));

        for (const file of cmdFiles) {
            const filePath = path.join(cmdPath, file);
            const cmd = require(filePath);

            this.commands.set(cmd.data.name, cmd);
        }

        console.log(`Loaded ${this.commands.size}/${cmdFiles.length} commands`);
    }

    async start() {
        await mongoose.connect(this.config.dbURI);
        await this.setCommands();
        await this.login(this.config.token);
    }
}

module.exports = Bot;