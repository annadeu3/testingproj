var router = require('express').Router();
var User = require('../models/user');


router.get('/signup', function(request, response, next) {
	response.render('accounts/signup');
});


router.post('/signup', function (request, response, next) {
	var user = new User();

	user.profile.name = request.body.name;
	user.password = request.body.password;
	user.email = request.body.email;

	User.findOne({ email: request.body.email }, function(err, existingUser) {
		if(existingUser) {
			console.log(request.body.email + " already exists");
			return response.redirect('/signup');
		} else {
			user.save(function(err, user) {
				if (err) return next(err);

				response.json('New user has been created!');
			});
		}
	});

});


module.exports = router;
