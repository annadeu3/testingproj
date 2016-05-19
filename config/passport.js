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

passport.use('local-login', new LocalStrategy( {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(request, email, password, done) {
	User.findOne({ email: email}, function(err, user) {
		if (err) return done(err);

		if (!user) {
			return done(null, false, request.flash('loginMessage', 'No user has been found'));
		}

		if (!user.comparePassword(password)) {
			return done(null, false, request.flash('loginMessage', 'OOPS! Wrong Password'));
		}

		return done(null, user);
	});
}));



//custom function to validate
exports.isAuthenticated = function (request, response, next) {
	if (request.isAuthenticated()) {
		return next();
	}
	response.redirect('/login');
};



