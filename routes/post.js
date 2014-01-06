var moment = require('moment');
var BlogPost = require('./../models/blog-model');
var Q = require('q');

var post = {
	// On click on of new post
	getNewPost: function(req, res) {
		console.log('rb',req.body);
		var author = req.body.author,
			title = req.body.title,
			post = req.body.post,
			blogPost = new BlogPost({
				author : author,
				time : moment().zone(420).format('MMMM Do YYYY, h:mm:ss a'),
				title : title,
				post : post
			});
		Q(blogPost.save()).then(
			res.redirect('../'));
	},
	// Sends all the blog posts, sorted by time in descending order to template
	renderPost: function(req, res) {
		BlogPost.find({}, null, { sort: {time:'desc'}}, function (err, blogPost){
			if(err){console.error('ERROR');}
			else{
				res.send(blogPost);
			}
		});
	},
	// Called when the delete post is clicked
	deletePost: function(req, res) {
		var toDelete = req.body;
		BlogPost.findByIdAndRemove(toDelete._id, function(err, id){
			if(err){console.error('ERROR');}
			else{
				res.send({success:'deleted'});
			}
		});
	},
	// When new comments are posted
	getNewComment: function(req, res) {
		var commentData = req.query;
		var newCommentObj = {
			name: commentData.name,
			body: commentData.comment,
			time: moment().zone(420).format('MMMM Do YYYY, h:mm:ss a')
		};
		BlogPost.findById(commentData._id, function(err, blogPost){
			if(err){console.error('ERROR');}
			else{
				blogPost.comments.unshift(newCommentObj);
				blogPost.save(function(err, blogPost){
					if(err){console.error('ERROR!');}
					else{
						console.log({commentObj: blogPost});
						res.render('comments', blogPost);
					}
				});
			}
		});
	},
	// Renders posts by id
	getPost: function (req, res){
		var id = req.params.id;
		BlogPost.findById(id, function(err, blogPost){
			if(err){console.error('ERROR');}
			else{
				res.render('posts', blogPost);
			}
		});
	},
	// Renders posts by author
	getAuthorPosts: function(req, res){
		var authorName = req.params.authorName;
		console.log(authorName);
		BlogPost.find({author : authorName}, function(err, blogPost){
			if(err){console.error('ERROR');}
			else{
				res.render('author', {author : blogPost});
			}
		});
	}
};

module.exports = post;