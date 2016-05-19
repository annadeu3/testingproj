var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var app = express();


mongoose.connect('mongodb://annadeu3:abc123@ds025772.mlab.com:25772/ecommerce', function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to the database');
	}
});

//middelware-logging
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: "Anna123"
}));
app.use(flash());

app.engine('ejs', engine);
app.set('view engine', 'ejs');


var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);


app.listen(3000, function (err) {
	if (err) throw err;
	console.log("Server is running successfully");
});

