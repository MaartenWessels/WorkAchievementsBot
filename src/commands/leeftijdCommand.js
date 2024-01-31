const { firstAgeMessage, editAgeMessage } = require('../messages/agesMessage')
const { firstTeamsMessage } = require('../messages/teamsMessage')
const { fetchUserData, createNewUser } = require('../utils/databaseUtils')

function leeftijdCommand(bot) {
  bot.onText(/\/leeftijd/, async (message) => {
    const chatId = message.chat.id
    const userId = message.from.id

    if (message.chat.type !== 'private') {
      return
    }

    const user = await fetchUserData(userId)

    if (!user || !user.team) {
      firstTeamsMessage(bot, chatId)
      createNewUser(message.from)
      return
    } else if (!user.age_range) {
      firstAgeMessage(bot, chatId)
      return
    }

    if (user) {
      editAgeMessage(bot, chatId, user)
    }
  })
}

module.exports = leeftijdCommand
