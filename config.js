var config = {
	production : {
		MongoUrl : process.env.MONGOHQ_URL
	},

	development : {
		MongoUrl : 'http://localhost'
	}
};

module.exports = global.process.env.NODE_ENV ===
'production' ? config.production : config.development;