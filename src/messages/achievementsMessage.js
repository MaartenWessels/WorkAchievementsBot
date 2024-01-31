const { fetchData, setDefaultUser } = require("../utils/databaseUtils")

const achievementsMessage = async function (bot, chatId, user, messageId) {
  const currentRound = await fetchData('round')
  const ageRanges = await fetchData('age_ranges')
  const userAgeRange = ageRanges[user.age_range]

  user = setDefaultUser(user, currentRound)

  const userRoundAchievements = user.achievements[currentRound]

  const achievementOptions = Object.values(userAgeRange.achievements).map((achievement) => [
    {
      text: (userRoundAchievements.includes(achievement.id) ? '✅ ' : '') + achievement.title,
      callback_data: 'achievement:' + achievement.id,
    },
  ])

  achievementOptions.push([{ text: 'Overzicht', callback_data: 'overview' }])

  const messageText = 'Welke Achievements heb je behaald?'
  const messageReplyMarkup = {
    inline_keyboard: achievementOptions,
  }
  if (messageId) {
    bot.editMessageText(messageText, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: messageReplyMarkup,
      parse_mode: 'Markdown',
    })
  } else {
    bot.sendMessage(chatId, messageText, {
      reply_markup: messageReplyMarkup,
      parse_mode: 'Markdown',
    })
  }
}

module.exports = achievementsMessage