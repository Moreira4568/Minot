const { MessageEmbed } = require('discord.js');
var kill = require('tree-kill');
const { spawn, exec } = require('child_process');

var bat = spawn('java', ['-Xmx5024M', '-Xms5024M', '-jar', 'craftbukkit.jar', 'nogui', 'PAUSE'], { cwd: './server' });

const loading = new MessageEmbed()
  .setTitle('Estado do Servidor')
  .setDescription(`
⌛ A ligar...
`)
  .setFooter('Developed by .Moreira')
  .setColor('#fff200');

const loaded = new MessageEmbed()
  .setTitle('Estado do Servidor')
  .setDescription(`
:white_check_mark: Ligado.
`)
  .setFooter('Developed by .Moreira')
  .setColor('#00cc00');

const closing = new MessageEmbed()
  .setTitle('Estado do Servidor')
  .setDescription(`
⌛ A guardar os mundos e a desligar..
`)
  .setFooter('Developed by .Moreira')
  .setColor('#fff200');

  const closed = new MessageEmbed()
  .setTitle('Estado do Servidor')
  .setDescription(`
:red_circle: Desligado.
`)
  .setFooter('Developed by .Moreira')
  .setColor('#FF0000');



const startServer = (msg) => {
  var message = undefined

  if (msg.content === '!run') {

    bat.stdout.on('data', (data) => {
      console.log(data.toString());
      if (data.toString().match("Done")) {
        message.edit(loaded)
      }
    });

    bat.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    msg.channel.send(loading).then((msg) => {
      message = msg
    })

  }
};

const killServer = (msg) => {
  var message = undefined

  if (msg.content === '!kill') {
    msg.channel.send(closing).then((msg) => {
      message = msg
    })

    bat.stdin.write("stop\n");
    bat.stderr.on('close', (code) => {
      message?.edit(closed)
      bat = spawn('java', ['-Xmx5024M', '-Xms5024M', '-jar', 'craftbukkit.jar', 'nogui', 'PAUSE'], { cwd: './server' });
    });
  }
};

module.exports = { startServer, killServer, bat };
