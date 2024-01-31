const fs = require('fs')
const { fetchData, fetchUserData } = require("../utils/databaseUtils")

async function exportCommand(bot) {
  bot.onText(/\/export/, async (message) => {
    const chatId = message.chat.id
    const userId = message.from.id
    
    const user = await fetchUserData(userId)

    if (!user?.administrator) {
      bot.sendMessage(chatId, 'Deze actie kan alleen de beheerder van de bot gebruiken.')
      return
    }

    const users = await fetchData('users')
    const ageRanges = await fetchData('age_ranges')
    const round = await fetchData('round')
    let rounds = []
    for (let i = 0; i < round; i++) {
      rounds.push(`ronde ${i + 1}`)
    }

    const userRows = Object.values(users).map((user) => {
      const userAgeAchievements = ageRanges[user?.age_range || '12-15'].achievements
      const achievementsPerRound = Object.entries(user?.achievements || {})
        .filter(([round, values]) => Array.isArray(values) && round !== 'added_at')
        .map(([round, values]) => values.map(achievement => userAgeAchievements[achievement].title).join(', '))
      
      return [user.id.toString(), user.first_name, user.last_name, user.team, user.age_range, ...achievementsPerRound]
    })

    const rows = [
      ['id', 'voornaam', 'achternaam', 'team', 'leeftijd', ...rounds],
      ...userRows
    ]

    const csvContent = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
    fs.writeFileSync('output.csv', csvContent)

    bot.sendDocument(message.chat.id, 'output.csv')
  }) 
}

module.exports = exportCommand