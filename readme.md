# botkit-telegram

> 🤖👾 A Botkit connector for Telegram with support for text.

Highly based on [Brandon Him / brh55](http://github.com/brh55) work

This Botkit platform connector is intended to be used for Telegram. It was develop for a simple need to reply to users. Functionnality are limited...

## Install
*Note: Minimum Node Requirement 8+, Recommended 10, and >=10.10.0 if you use audio.*

`$ npm install botkit-telegram`

## Basic Usage
```javascript
const BotkitTelegram = require('botkit-telegram');
const config = {
    token: '**' // Telegram bot token
}

const telegramBot = BotkitTelegram(config);

telegramBot.hears('hello','direct_message',(bot, message) => {
    bot.reply(message, 'how goes there :)!');
});

telegramBot.hears('.*', 'direct_mention', (bot, message) => {
    bot.reply(message, 'leave me to be please.');
});
```

## Events
When you want your bot to respond to particular events that may be relevant, you can use the `.on` method.

```javascript
discordBot.on(EVENT_NAME, event => {
    // do stuff
});
```

### Incoming Events

| Event          | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| ambient        | a channel the bot is in has a new message                    |
| direct_message | the bot received a direct message from a user                |
| direct_mention | the bot was addressed directly in a channel ("@bot hello")   |
| mention        | the bot was mentioned by someone in a message ("hello @bot") |

## License

Ⓒ MIT [Matthieu Derasse](http://github.com/mderasse)

Please let me know if you plan on forking or would like professional support. Open-source is a hobby, but it would be great as a full-time gig :)

