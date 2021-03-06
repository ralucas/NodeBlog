var express = require('express');
var routes = require('./routes');
var post = require('./routes/post');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//create server
var server = http.createServer(app);

//routes
app.get('/', routes.index);
app.get('/admin', routes.admin);
app.get('/render-post', post.renderPost);
app.post('/delete-post', post.deletePost);
app.get('/add-comment', post.getNewComment);

app.get('/posts/:id', post.getPost);
app.get('/author/:authorName', post.getAuthorPosts);

app.post('/blog-post', post.getNewPost);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
