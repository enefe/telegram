/* console.log(window.Telegram.WebApp); */
/* const request = require('request'); */
const TelegramBot = require('node-telegram-bot-api');

const token = '5359355956:AAEAMReleozRWWkMhGSA81MfiGS0ghEBPFo';

const bot = new TelegramBot(token, {polling: true});

const arrMessageBot = ['Привет', 'Hello', 'Здравствуйте'];

const roundMatch = (max, min) => {  
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

bot.on('message', (msg) => {
    const { id, first_name } = msg.chat;

    if(/Привет/gi.test(msg.text)) {
        bot.sendMessage(id, `${arrMessageBot[roundMatch(2, 0)]}, ${first_name}`);
    }
});

bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Start Test');
})