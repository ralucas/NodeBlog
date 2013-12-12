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

	//get data from server
	$.get('/render-post', function(data){
		//Handlebars
		var source = $("#post-template").html();
		var template = Handlebars.compile(source);
		$('.posts').html(template({blogPost : data}));
	});

	$(document).on('click', ".ico-delete", function(){
		var id = $(this).closest('.blog-post').attr('data-id');
		console.log(id);
		// $(this).closest('.blog-post').remove();
	});
});