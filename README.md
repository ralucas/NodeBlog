A Blog in Node.js
=================

1. Any user can view all the posts on the home page.
2. Any user can add a post that includes at least a title and body for the post.
3. Any user can add a comment to any post.
4. Any user can delete any post.

To-do plan
-----------
1. Back-end with sign-in
	* both social login and local using passport
		* use login as name for post
	* parser for title and text input
		* potentially look at a markdown parser
1. Front-end shows:
	* Posts
		* Shows name, date created, and date last edited
	* Header and Footer
		* editable on the back-end
	* Ability to add comments
		* one-click
	* Delete or X to delete posts