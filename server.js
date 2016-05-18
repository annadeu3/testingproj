var express = require('express');
var morgan = require('morgan');
var app = express();

//middelware- logging
app.use(morgan('dev'));

app.get('/', function (request, response) {
	var name = "Anna";
	response.json('My name is ' + name);
});

app.get('/name', function (request, response) {
	response.json('Jason');
});

app.listen(3000, function (err) {
	if (err) throw err;
	console.log("Server is running successfully");
});

