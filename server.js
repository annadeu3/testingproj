var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

var app = express();


mongoose.connect('mongodb://annadeu3:abc123@ds025772.mlab.com:25772/ecommerce', function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to the database');
	}
});

//middelware-logging
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.engine('ejs', engine);
app.set('view engine', 'ejs');



app.post('/create-user', function (request, response, next) {
	var user = new User();

	user.profile.name = request.body.name;
	user.password = request.body.password;
	user.email = request.body.email;

	user.save(function(err) {
		if (err) return next(err);
		response.json("Successfully created a new user");
	});
});


app.get('/', function(request, response) {
	response.render('home');
});


app.listen(3000, function (err) {
	if (err) throw err;
	console.log("Server is running successfully");
});

