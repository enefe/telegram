const TelegramBot = require('node-telegram-bot-api');

const token = '5359355956:AAEAMReleozRWWkMhGSA81MfiGS0ghEBPFo';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Start Test');
})