const Botkit = require('botkit');
const Telegram = require('node-telegram-bot-api');
const telegramEvents = require('./telegram-events');
const middleware = require('./middleware');
const botDefinition = require('./bot');

const newMessageHandler = (message, controller) => {
	const bot = controller.spawn({});
	const source = {
		raw: message
	}

	controller.ingest(bot, {}, source);
};

const getUser = async (client) => {
	return await client.getMe();
};

const TelegramBot = (configuration) => {
	const client = new Telegram(configuration.token, { polling: true });
	configuration.client = client;

	const telegramBotkit = Botkit.core(configuration || {});
	telegramBotkit.defineBot(botDefinition);

	const user = getUser(client);

	telegramBotkit.config.client.user = user
	telegramBotkit.trigger('ready', [telegramBotkit, user])
	telegramBotkit.log('Logged in as %s - %s\n', user.username, user.id);

	// Attach Handlers and Middlewares
	telegramBotkit.handleMessageRecieve = newMessageHandler;
	telegramBotkit.middleware.ingest.use(middleware.ingest.handler);
	telegramBotkit.middleware.categorize.use(middleware.categorize.handler);
	telegramBotkit.middleware.format.use(middleware.format.handler);

	client.on('message', async message => {
		telegramBotkit.debug(`Received ${message.text}`);
		telegramBotkit.handleMessageRecieve(message, telegramBotkit);
	});

	// Set up triggers for remaining events
	telegramEvents.map(event => {
		client.on(event, (...params) => {
			telegramBotkit.trigger(event, [telegramBotkit, params]);
		});
	});

	if (configuration.debug) {
		client.on('debug', info => {
			telegramBotkit.debug(info);
			telegramBotkit.trigger('debug', [telegramBotkit, info]);
		});
	}

	// Stay Alive Please
	telegramBotkit.startTicking();

	return telegramBotkit
};


module.exports = TelegramBot;
