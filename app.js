var fs = require('fs');
var file = __dirname + '/public/temp2.json';
var headerfile = __dirname + '/public/header.json';
var content = {};
var header = {};
var express = require('express'),
	app = express(),
	connect = require('connect'),
	http = require('http'),
	swig = require('swig'),
	data;

fs.readFile(file, 'utf8', function (err, data) {
  if (err) return err;
  content = JSON.parse(data);
});
fs.readFile(headerfile, 'utf8', function (err, data) {
  if (err) return err;
  header = JSON.parse(data);
});

	
app.use(connect.json());
app.use(connect.urlencoded());
app.use('/public', express.static(__dirname + '/public'));
app.engine('html',swig.renderFile) //gives the app rendering engine a consolidate swig
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.get('/', function(req,res){
	res.render('main',{data:content, header:header}); //doc
});
app.post('/', function(req,res){
	fs.writeFile(file, JSON.stringify(req.body.data), 'utf-8', function(err){
		if (err)  throw err;
		content = req.body.data;
		res.render('main',{data:content, header:header}); //doc
	});
});

app.get('*', function(req,res){	res.send("Page not found", 404);})
http.createServer(app).listen(8080, function(){
  console.log('Express server running');
});