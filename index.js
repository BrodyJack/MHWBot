require('dotenv').config();

const description = require('./commands/description');
const ping = require('./commands/ping');
const weakness = require('./commands/weakness');
const Discord = require("discord.js");

console.log('Starting...')
const client = new Discord.Client();
client.login(process.env.LOGIN_CRED);
client.on('ready', () => {
    console.log('Ready!')
});

const commands = {
    description,
    ping,
    weakness
};

client.on('message', msg => {
    if (msg.channel.id === process.env.MH_CHANNEL) {
        let tokens = msg.content.split(' ') || [''];
        let command = tokens.shift();
        if (command.charAt(0) === '!') {
            command = command.substring(1);
            commands[command] && commands[command](tokens, msg);
        }
    }
});
