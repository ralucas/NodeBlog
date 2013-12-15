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
	comments: [{
		name: String,
		body: String,
		time: {type: Object, default: moment().format('MMMM Do YYYY, h:mm:ss a')}
	}]
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

exports.getNewComment = function(req, res){
	var commentData = req.body;
	var newCommentObj = {
		name : commentData.commentName,
		body : commentData.commentText
	};
	BlogPost.findById(commentData._id, function(err, blogPost){
		if(err){console.error('ERROR');}
		else{
			blogPost.comments.unshift(newCommentObj);
			//blogPost.comments.reverse();
			blogPost.save();
			//res.send(blogPost);
			setTimeout(function(){
				BlogPost.find(function(err, updPosts){
					if(err){console.error('ERROR');}
					else{
						console.log(updPosts);
						updPosts.reverse();
						//console.log(updPosts);
						res.send(updPosts);
					}
				})
			},100);
		}
	});

};

exports.getAuthorPosts = function(req, res){
	var authorName = req.params.authorName;
	BlogPost.find({author : authorName}, function(err, blogPost){
		if(err){console.error('ERROR');}
		else{
			res.send(blogPost);
		}
	});
};

// BlogPost.findByIdAndUpdate(commentData._id,
// 		{comments: [newCommentObj]}, function(err, blogPost){
// 		if(err){console.error('ERROR');}
// 		else{
// 			console.log('cd', commentData);
// 			blogPost.save();
// 			console.log('bp', blogPost);
// 			res.send({success:'success'});
// 		}
// 	});

