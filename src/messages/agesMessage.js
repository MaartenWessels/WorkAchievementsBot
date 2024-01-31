const firstAgeMessage = function (bot, chatId, messageId) {
  const messageText = 'Top! En in welke leeftijdscategorie zit je?'
  const reply_markup = {
    inline_keyboard: [
      [
        { text: '12-15', callback_data: 'age_range:12-15' },
        { text: '16-17', callback_data: 'age_range:16-17' },
      ],
      [
        { text: '18-25', callback_data: 'age_range:18-25' },
        { text: '26+', callback_data: 'age_range:26+' },
      ],
    ],
  }

  if (messageId) {
    bot.editMessageText(messageText, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup,
      parse_mode: 'Markdown',
    })
  } else {
    bot.sendMessage(chatId, messageText, {
      reply_markup,
      parse_mode: 'Markdown',
    })
  }
}

const editAgeMessage = async function (bot, chatId, user) {
  bot.sendMessage(
    chatId,
    `Leeftijdscategorie wijzigen.\nJe huidige categorie is: *${user.age_range}*.\n*Let op!*\n\nAls je van leeftijdscategorie wijzigd, worden jouw Achievements gereset voor deze maand.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '12-15', callback_data: 'edit-age_range:12-15' },
            { text: '16-17', callback_data: 'edit-age_range:16-17' },
          ],
          [
            { text: '18-25', callback_data: 'edit-age_range:18-25' },
            { text: '26+', callback_data: 'edit-age_range:26+' },
          ],
          [{ text: 'Overzicht', callback_data: 'overview' }],
        ],
      },
      parse_mode: 'Markdown',
    }
  )
}

const editedAgeMessage = async function (bot, chatId, messageId, age_range) {
  bot.editMessageText(
    `Je leeftijdscategorie is succesvol gewijzigd!\nJe categorie is aangepast naar: *${age_range}*.`,
    {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown',
    }
  )
}

module.exports = { firstAgeMessage, editAgeMessage, editedAgeMessage }