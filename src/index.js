const { telegramBotKey } = require('./utils/config')
const TelegramBot = require('node-telegram-bot-api')

// Your bot initialization code and other setup
const bot = new TelegramBot(telegramBotKey, {
  polling: true,
})

// Import command modules
const startCommand = require('./commands/startCommand')
const callbackQuery = require('./commands/callbackQuery')
const teamCommand = require('./commands/teamCommand')
const achievementsCommand = require('./commands/achievementsCommand')
const leeftijdCommand = require('./commands/leeftijdCommand')
const exportCommand = require('./commands/exportCommand')
const statusCommand = require('./commands/statusCommand')

// Pass the database instance to command modules if needed
startCommand(bot)
teamCommand(bot)
leeftijdCommand(bot)
achievementsCommand(bot)
statusCommand(bot)
exportCommand(bot)

callbackQuery(bot)

console.info('The bot is initialized!')