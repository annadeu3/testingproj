var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConf = require('../config/passport');

router.get('/login', function(request, response, next) {
  if (request.user) return response.redirect('/');
  response.render('accounts/login', { message: request.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

router.get('/profile', function(request, response, next) {
  User.findOne({ _id: request.user._id }, function(err, user) {
    if (err) return next(err);

    response.render('accounts/profile', { user: user });
  });
});

router.get('/signup', function(request, response, next) {
	response.render('accounts/signup', {
		errors: request.flash('errors')
	});
});


router.post('/signup', function (request, response, next) {
	var user = new User();

	user.profile.name = request.body.name;
	user.password = request.body.password;
	user.email = request.body.email;

	User.findOne({ email: request.body.email }, function(err, existingUser) {
		if(existingUser) {
			request.flash('errors', 'Account with that email already exists');
			return response.redirect('/signup');
		} else {
			user.save(function(err, user) {
				if (err) return next(err);

				return response.redirect('/');
			});
		}
	});

});


module.exports = router;
