const startMessage = require('../messages/startMessage')
const { fetchUserData, createNewUser } = require('../utils/databaseUtils')
const { firstTeamsMessage } = require('../messages/teamsMessage')

function startCommand(bot) {
  bot.onText(/\/start/, async (message) => {
    const chatId = message.chat.id
    const userId = message.from.id

    if (message.chat.type !== 'private') {
      return
    }

    const user = await fetchUserData(userId)

    if (user && user.team) {
      startMessage(bot, chatId, user)
    } else {
      firstTeamsMessage(bot, chatId)
      createNewUser(message.from)
    }
  })
}

module.exports = startCommand
