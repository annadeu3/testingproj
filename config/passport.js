var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy();

//serialize and deserialize

// serialize: process by translating data structures 
// or object states into a form that can be stored
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});


//Middleware



//custom function to validate

