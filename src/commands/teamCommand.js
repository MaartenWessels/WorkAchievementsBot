const { editTeamMessage, firstTeamsMessage } = require('../messages/teamsMessage')
const { fetchUserData, createNewUser } = require('../utils/databaseUtils')

function teamCommand(bot) {
  bot.onText(/\/team/, async (message) => {
    const chatId = message.chat.id
    const userId = message.from.id

    if (message.chat.type !== 'private') {
      return
    }
  
    const user = await fetchUserData(userId)
  
    if (user && user.team) {
      await editTeamMessage(bot, chatId, user)
    } else {
      firstTeamsMessage(bot, chatId)
      createNewUser(message.from)
    }
  })
}

module.exports = teamCommand