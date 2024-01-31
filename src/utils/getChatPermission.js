const { telegramGroupId } = require("./config")

const getChatPermission = async function (bot, chatId, userId) {
  try {
    const chatMember = await bot.getChatMember(telegramGroupId, userId)
    const chatPermission = ['member', 'administrator', 'creator'].includes(chatMember.status)

    if (!chatPermission) {
      bot.sendMessage(chatId, 'Interactie met deze bot niet toegestaan.')
      return false
    }

    return chatPermission
  } catch (error) {
    console.error('Error in getChatPermission with user: ' + userId, error)
    // Log the error, but allow the code to continue assuming the user is allowed
    return true
  }
}

module.exports = getChatPermission