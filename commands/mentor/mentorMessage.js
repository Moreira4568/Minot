const { MessageEmbed } = require('discord.js');
const roles = require('../../roles');

const description = roles
  .filter((r) => r.roleName !== 'mentor' && r.roleName !== 'mentorado')
  .reduce((a, b) => `${a} \n ${b.emoji} - ${b.roleName}\n`);

module.exports = (emoji) => new MessageEmbed()
  .setTitle('ð©ð½âð» Quais os temas que vocÃª deseja receber/oferecer mentorias? ð¨ð½âð»')
  .setDescription(`
    ${description}    
    ${emoji} - Pronto
    `)
  .setFooter('Criado com ð pela comunidade perifaCode')
  .setColor('#fff200');
