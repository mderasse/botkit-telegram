const cloneDeep = require('clone-deep');

const ingest = (bot, payload, source) => {
	payload.raw_message = source.raw;
	payload.message = source.raw;
	payload.text = source.raw.text;
	payload.user = source.raw.from.id;
	payload.channel = source.raw.chat.id
	return payload;
};

module.exports.handler = (bot, opayload, source, next) => {
	ingest(bot, opayload, source);
	next();
}

module.exports.exec = ingest;
