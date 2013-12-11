$(function(){

	//get new blog post
	$("#blog-post-form").on('submit', function(e){
		e.preventDefault();
		var blogPostData = $(this).serialize();
		console.log(blogPostData);

		$.post('/blog-post', blogPostData, function(data){
			console.log(data);
		});
	});

	////
	//render new blog post
	////

	//Handlebars
	var source = $("#post-template").html();
	var template = Handlebars.compile(source);

	//get data from server
	$.get('/render-post', function(data){
		$('.posts').html(template({blogPost : data}));
	});

});