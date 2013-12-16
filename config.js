var config = {
	production : {
		MongoUrl : process.env.MONGOHQ_URL,
		title : 'No_deBlog'
	},

	development : {
		MongoUrl : 'http://localhost',
		title : 'No_deBlog'
	}
};

module.exports = global.process.env.NODE_ENV ===
'production' ? config.production : config.development;