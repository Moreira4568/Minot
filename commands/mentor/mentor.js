const mentorMessage = require('./mentorMessage');
const getMemberReactions = require('./getMemberReactions');
const manageRole = require('./manageRole');
const getServerRoles = require('./getServerRoles');
const processedEmojiList = require('./processEmojiList');
const reactionsFilter = require('./reactionsFilter');
const reactToMessage = require('./reactToMessage');
const roles = require('../../roles');

module.exports = (msg) => {
  if (msg.content === '!mentor' || msg.content === '!mentorado') {
    // initial reaction
    reactToMessage(msg, ['ð', 'ð']);

    const guildMember = msg.member;
    const emojiList = processedEmojiList(msg, roles);
    const serverRoles = getServerRoles(msg);

    msg.reply(mentorMessage(emojiList[emojiList.length - 1])).then((message) => {
      // reacts to message with all emojis from emojiLIst
      reactToMessage(message, emojiList);
      message.awaitReactions((reaction, member) => reactionsFilter(reaction, member, guildMember), { max: 1, time: 60000, errors: ['time'] })
        .then(() => {
          const reactions = getMemberReactions(message, guildMember);
          manageRole(reactions, guildMember, serverRoles);
          msg.channel.send('ðTudo pronto! Clique no seu perfil ( â¡  â¡) para ver os novos cargos! ð');
        })
        .catch((error) => console.error(error));
    })
      .catch((error) => console.error(error));
  }
};
