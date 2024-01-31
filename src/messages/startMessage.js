const { fetchUserRoundCoins } = require("../utils/databaseUtils")
const { teamTitles } = require("../utils/enums")

async function startMessage(bot, chatId, user, messageId) {
  const userCoins = await fetchUserRoundCoins(user)
  const messageText = [
    `Hallo ${user.first_name}!`,
    'Bekijk het menu voor het toevoegen van *Achievements*, wijzigen van gegevens en meer!\n',
    'Jouw huidige status:',
    `Team: *${teamTitles[user.team]}*`,
    `Leeftijd: *${user.age_range}*`,
    `Coins: *${userCoins}* (Deze ronde)`,
  ].join('\n')

  if (messageId) {
    bot.editMessageText(messageText, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown',
    })
  } else {
    bot.sendMessage(chatId, messageText, {
      parse_mode: 'Markdown',
    })
  }
}

module.exports = startMessage
