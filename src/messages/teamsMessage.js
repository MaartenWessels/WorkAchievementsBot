const { teamTitles } = require("../utils/enums")

const firstTeamsMessage = function (bot, chatId) {
  bot.sendMessage(chatId, 'Hallo! In welk team zit je?', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🟢 Groen', callback_data: 'team:groen' },
          { text: '🟠 Oranje', callback_data: 'team:oranje' },
        ],
        [
          { text: '🔴 Rood', callback_data: 'team:rood' },
          { text: '🔵 Blauw', callback_data: 'team:blauw' },
        ],
      ],
    },
  })
}

const editTeamMessage = async function (bot, chatId, user) {
  bot.sendMessage(chatId, `Team wijzigen.\nJe huidige team is: *${teamTitles[user.team]}*.`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🟢 Groen', callback_data: 'edit-team:groen' },
          { text: '🟠 Oranje', callback_data: 'edit-team:oranje' },
        ],
        [
          { text: '🔴 Rood', callback_data: 'edit-team:rood' },
          { text: '🔵 Blauw', callback_data: 'edit-team:blauw' },
        ],
        [{ text: 'Overzicht', callback_data: 'overview' }],
      ],
    },
    parse_mode: 'Markdown',
  })
}

const editedTeamMessage = async function (bot, chatId, messageId, team) {
  bot.editMessageText(
    `Je team is succesvol gewijzigd!\nJe hoort nu bij team: *${teamTitles[team]}*.`,
    {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown',
    }
  )
}

module.exports = { firstTeamsMessage, editTeamMessage, editedTeamMessage }
