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
	var commentData = req.query;
	console.log(commentData);
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
			console.log({commentArr: blogPost});
			res.render('comments', {commentArr: blogPost});
		}
	});
};

exports.getPost = function (req, res){
	var id = req.params.id;
	BlogPost.findById(id, function(err, blogPost){
		if(err){console.error('ERROR');}
		else{
			console.log('bp', blogPost);
			res.render('posts', blogPost);
		}
	});
};

exports.getAuthorPosts = function(req, res){
	var authorName = req.params.authorName;
	console.log(authorName);
	BlogPost.find({author : authorName}, function(err, blogPost){
		if(err){console.error('ERROR');}
		else{
			//console.log(blogPost);
			res.render('author', {author : blogPost});
		}
	});
};

