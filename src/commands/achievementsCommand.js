const { fetchUserData, createNewUser } = require('../utils/databaseUtils')
const { firstTeamsMessage } = require('../messages/teamsMessage')
const achievementsMessage = require('../messages/achievementsMessage')
const { firstAgeMessage } = require('../messages/agesMessage')

function achievementsCommand(bot) {
  bot.onText(/\/achievements/, async (message) => {
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
      achievementsMessage(bot, chatId, user)
    }
  })
}

module.exports = achievementsCommand
