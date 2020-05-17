const isDirectMention = (botName, messageText) => messageText.indexOf('@' + botName) !== -1;
const isMention = (botName, messageText) => messageText.indexOf('@' + botName, 1) !== -1;

// Recategorize
const categorize = (bot, message) => {
	const botName = bot.botkit.config.client.user.username;

	if (typeof message.text !== 'undefined') {
		if (message.raw_message.chat.type === 'private') {
			message.type = 'direct_message';
		} else {
			message.type = 'ambient';

			if (isDirectMention(botName, message.text)) {
				message.type = 'direct_mention';
			} else if (isMention(botName, message.text)) {
				message.type = 'mention';
			}
		}
	}

	return message;
};

module.exports.handler = (bot, message, next) => {
	categorize(bot, message);
	next();
};

module.exports.exec = categorize;
