const achievementsMessage = require("../messages/achievementsMessage")
const { firstAgeMessage, editedAgeMessage } = require("../messages/agesMessage")
const startMessage = require("../messages/startMessage")
const { editedTeamMessage, firstTeamsMessage } = require("../messages/teamsMessage")
const { fetchUserData, saveUserData, createNewUser, setDefaultUser, fetchData } = require("../utils/databaseUtils")

function callbackQuery(bot) {
  bot.on('callback_query', async (query) => {
    const messageId = query.message.message_id
    const chatId = query.message.chat.id
    const userId = query.from.id

    let user = await fetchUserData(userId)

    if (user) {
      if (query.data.startsWith('overview')) {
        startMessage(bot, chatId, user, messageId)
      }
      if (query.data.startsWith('team:')) {
        user.team = query.data.split(':')[1]
        saveUserData(user)
        firstAgeMessage(bot, chatId, messageId)
      }

      if (query.data.startsWith('edit-team:')) {
        user.team = query.data.split(':')[1]

        saveUserData(user)
        editedTeamMessage(bot, chatId, messageId, user.team)
      }

      if (query.data.startsWith('age_range:')) {
        user.age_range = query.data.split(':')[1]
        saveUserData(user)
        achievementsMessage(bot, chatId, user, messageId)
      }

      if (query.data.startsWith('edit-age_range:')) {
        user.age_range = query.data.split(':')[1]
        const currentRound = await fetchData('round')

        // Resetting achievements because of age_range-change
        user.achievements ??= {}
        user.achievements[currentRound] = []

        saveUserData(user)
        editedAgeMessage(bot, chatId, messageId, user.age_range)
      }

      if (query.data.startsWith('achievement:')) {
        const achievement = query.data.split(':')[1]
        const currentRound = await fetchData('round')

        user = setDefaultUser(user, currentRound)

        const existingAchievements = user.achievements[currentRound]
        const dataIndex = existingAchievements.indexOf(achievement)

        if (dataIndex !== -1) {
          existingAchievements.splice(dataIndex, 1)
        } else {
          existingAchievements.push(achievement)
          user.achievements.added_at = new Date().toLocaleString(undefined, {
            timeZone: 'Europe/Amsterdam',
          })
        }

        saveUserData(user)
        achievementsMessage(bot, chatId, user, messageId)
      }
    } else {
      firstTeamsMessage(bot, chatId)
      createNewUser(query.message.from)
    }
  })
}

module.exports = callbackQuery
