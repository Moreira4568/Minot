const { MessageEmbed } = require('discord.js');
const {bat} = require('./bot')

module.exports = function teste(msg) {
  if (msg.content === '!help') {

    process.send("help")
    
    
    const embed = new MessageEmbed()
      .setTitle('🤖 A ligar esta merda 🤖')
      .setDescription(`
      ⌛ A ligar espera caralho
      `)
      .setFooter('Criado por .Moreira')
      .setColor('#fff200');
    msg.channel.send(embed);
  }
};
