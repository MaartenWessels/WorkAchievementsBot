const { fetchData, setDefaultUser, fetchUserData } = require('../utils/databaseUtils')
const { telegramGroupId } = require('../utils/config')
const { teamColorEmoji, teamTitles } = require('../utils/enums')

function statusCommand(bot) {
  const sendStatusMessage = async (message, destChat) => {
    const chatId = message.chat.id

    const [currentRound, ageRanges, teams, users] = await Promise.all([
      fetchData('round'),
      fetchData('age_ranges'),
      fetchData('teams'),
      fetchData('users'),
    ])

    const coinsPerTeam = {}

    for (const team in teams) {
      coinsPerTeam[team] = teams[team].extra_coins[currentRound]
    }

    for (let user of Object.values(users)) {
      const userAgeRange = ageRanges[user.age_range]
      user = setDefaultUser(user, currentRound)

      const processAchievements = (round) => {
        if (user.achievements[round]) {
          Object.values(user.achievements[round]).forEach((achievement) => {
            const achievementDetails = userAgeRange.achievements[achievement]
            coinsPerTeam[user.team] += achievementDetails.coins
          })
        }
      }

      processAchievements(currentRound)
    }

    const getMaxTeam = (teamObj) => {
      return Object.keys(teamObj).reduce((a, b) => (teamObj[a] > teamObj[b] ? a : b))
    }

    const roundWinner = getMaxTeam(coinsPerTeam)

    const statusMessage = `Status van de huidige maand:\n\n${Object.keys(coinsPerTeam)
      .map(
        (team) =>
          `${teamColorEmoji[team]} *${teamTitles[team]}*: ${coinsPerTeam[team]} coins ${
            team === roundWinner ? ' 🏆' : ''
          }`
      )
      .join(
        '\n'
      )}\n\n*Let op*:\nDeze stand is niet definitief en de inzendingen worden nog gecontroleerd.`

    bot.sendMessage(destChat || chatId, statusMessage, { parse_mode: 'Markdown', silent: true })
  }

  bot.onText(/\/status/, async (message) => {
    const userId = message.from.id
    
    const user = await fetchUserData(userId)
    // TODO: add check for if user is approved
    if (!user?.team || message.chat.type !== 'private') {
      return
    }
    await sendStatusMessage(message)
  })

  bot.onText(/\/deelstatus/, async (message) => {
    const userId = message.from.id
    
    const user = await fetchUserData(userId)

    if (!user?.administrator || message.chat.type !== 'private') {
      return
    }
    await sendStatusMessage(message, telegramGroupId)
  })
}

module.exports = statusCommand
