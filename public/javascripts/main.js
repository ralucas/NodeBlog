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

	//render new blog posts
	$.get('/render-post', function(data){
		//Handlebars
		var source = $("#post-template").html();
		var template = Handlebars.compile(source);
		$('.posts').html(template({blogPost : data}));
	});

	//delete a post
	$(document).on('mouseover', ".ico-delete", function(){
		$(this).tooltip('show');
	});

	$(document).on('click', ".ico-delete", function(){
		var id = $(this).closest('.blog-post').attr('data-id');
		var $that = $(this);
		$.post('/delete-post', {_id : id}, function(data){
			if(data['success']){
				$that.closest('.blog-post').remove();
			}
		});
	});

	//add a comment
	$(document).on('click', '.btn-addComment', function(){
		console.log('hi');
		var id = $(this).closest('.blog-post').attr('data-id');
		$(this).addClass('hidden');
		$(this).next('.comment-box').removeClass('hidden');
	});
});