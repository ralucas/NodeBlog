var mongoose = require('mongoose');
var moment = require('moment');

//connect MongoDb to Mongoose
var localMongo = 'mongodb://localhost';
var MongoUrl = process.env.MONGOHQ_URL ? process.env.MONGOHQ_URL : localMongo;
mongoose.connect(MongoUrl);

//setup db for blog posts
var blogPostSchema = new mongoose.Schema({
	autoIndex: false,
	author: String,
	time: Object,
	title: String,
	post: String,
	comments: [{
		name: String,
		body: String,
		time: Object
	}]
});

var BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;