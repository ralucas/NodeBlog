var moment = require('moment');
var BlogPost = require('./../models/blog-model');

//functions
exports.getNewPost = function (req,res){
	var author = req.body.author;
	var title = req.body.title;
	var post = req.body.post;
	var blogPost = new BlogPost({
		author : author,
		time : moment().zone(420).format('MMMM Do YYYY, h:mm:ss a'),
		title : title,
		post : post
	});
	blogPost.save();
};

exports.renderPost = function(req, res){
	BlogPost.find({}, null, { sort: {time:'desc'}}, function (err, blogPost){
		if(err){console.error('ERROR');}
		else{
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
		name : commentData.name,
		body : commentData.comment,
		time : moment().zone(420).format('MMMM Do YYYY, h:mm:ss a')
	};
	BlogPost.findById(commentData._id, function(err, blogPost){
		if(err){console.error('ERROR');}
		else{
			blogPost.comments.unshift(newCommentObj);
			blogPost.save();
			setTimeout(function(){
				BlogPost.find({}, null, { sort: {time:'desc'}}, function(err, updPosts){
					if(err){console.error('ERROR');}
					else{
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

