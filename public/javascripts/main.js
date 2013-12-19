$(function(){
	
	////
	//creating a new post
	////

	//get new blog post from admin add post
	$("#blog-post-form").on('submit', function(e){
		e.preventDefault();
		var blogPostData = $(this).serialize();
		var blogPostArray  = $(this).serializeArray();
		console.log(blogPostArray);
		//escaping html tags
		var escText = escape(blogPostData);
		if(escText){
			alert('No HTML Tags Please!  Thank you.');
		}
		//adding any linebreaks
		var entry = parseText(blogPostData);
		//making sure the form is filled
		var formIsFilled = validateForText(blogPostArray);
		if(formIsFilled && !escText) {
			$(this).find('input').val('');
			$(this).find('textarea').val('');
			$(this).find('.alert-success').removeClass('hidden').fadeIn();
			//ajax post blog-post data to server
			$.post('/blog-post', entry, function(data){
				console.log(data);
			});
		}
	});

	////
	//render new blog posts on '/' home page
	////

	$.get('/render-post', function(data){
		//Handlebars
		var source = $("#post-template").html();
		var template = Handlebars.compile(source);
		$('.posts').html(template({blogPost : data}));
	});

	////
	//delete a post
	////

	//show tooltip on delete icon
	$(document).on('mouseover', ".ico-delete", function(){
		$(this).tooltip('show');
	});

	//delete the post
	$(document).on('click', ".ico-delete", function(){
		var id = $(this).closest('.blog-post').attr('data-id');
		var $that = $(this);
		//ajax post sending which id to delete from db
		//then removes post from DOM on success message
		$.post('/delete-post', {_id : id}, function(data){
			if(data['success']){
				$that.closest('.blog-post').remove();
			}
		});
	});

	////
	//add a comment
	////

	//show the comment box
	$(document).on('click', '.btn-addComment', function(){
		$(this).addClass('hidden');
		$(this).next('.comment-box').removeClass('hidden');
	});

	//cancel comment
	$(document).on('click', '.btn-cancelComment', function(e){
		e.preventDefault();
		$(this).closest('.comment-box').addClass('hidden');
		$(this).closest('.comment-box').prev().removeClass('hidden');
	});

	//submit the comment and hide the comment box
	$(document).on('submit', '.comment-form', function(e){
		e.preventDefault();
	
		var $that = $(this);
		var commentData = $(this).serialize();
		var commentDataArray = $(this).serializeArray();

		var formIsFilled = validateForText(commentDataArray);

		if(formIsFilled){
			$(this).find('input').val('');
			$(this).find('textarea').val('');
			$that.closest('.comment-box').addClass('hidden');
			$that.closest('.comment-box').prev().removeClass('hidden');
			//ajax get sending which id to add comment to
			//then re-renders comment area
			$.get('/add-comment', commentData, function(data){
				$that.closest('article').find('.comments').html(data);
			});
		}
	});

});