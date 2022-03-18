const { Client, MessageEmbed } = require('discord.js');
const help = require('nodemon/lib/help');

const client = new Client();
const {startServer, killServer} = require('./commands/bot');
const teste = require('./commands/teste');

require('dotenv/config');

client.on('message', (msg) => {
  startServer(msg)
  teste(msg)
  killServer(msg)
});

client.login(process.env.TOKEN_DISCORD);
