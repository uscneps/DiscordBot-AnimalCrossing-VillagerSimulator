const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
// guildId (rightclikc on server > copy id) is optional if you want to deploy to a specific server
const { clientId, token } = require('./config.json');

// Remember to run node deploy-commands.js to register your commands!
const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

// You only need to run node deploy-commands.js once. You should only run it again if you add or edit existing commands.
const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
    .catch(console.error);
