
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'No_deBlog' });
};

exports.admin = function(req, res){
	res.render('admin');
};