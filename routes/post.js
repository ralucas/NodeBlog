var mongoose = require('mongoose');
var moment = require('moment');

//connect MongoDb to Mongoose
var localMongo = 'mongodb://localhost';
var MongoUrl = process.env.MONGOHQ_URL ? process.env.MONGOHQ_URL : localMongo;
mongoose.connect(MongoUrl);

//setup db for blog posts
var blogPostSchema = new mongoose.Schema({
	author: String,
	time: {type: Object, default: moment().format('MMMM Do YYYY, h:mm:ss a')},
	title: String,
	post: String,
	comments: [{ body: String, date: Date }]
});

var BlogPost = mongoose.model('BlogPost', blogPostSchema);

//functions
exports.getNewPost = function (req,res){
	var author = req.body.author;
	var title = req.body.blogPostTitle;
	var post = req.body.blogPostText;
	var blogPost = new BlogPost({
		author : author,
		title : title,
		post : post
	});
	blogPost.save();
	console.log(blogPost);
};

exports.renderPost = function(req, res){
	BlogPost.find(function (err, blogPost){
		if(err){console.error('ERROR');}
		else{
			blogPost.reverse();
			res.send(blogPost);
		}
	});
};

exports.deletePost = function(req, res){
	var toDelete = req.body;
	BlogPost.findByIdAndRemove(toDelete._id, function(err, id){
		if(err){console.error('ERROR');}
		else{
			res.send({success:'deleted'});
		}
	});
};