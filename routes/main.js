var router = require('express').Router();


router.get('/', function(request, response) {
	response.render('main/home');
});

router.get('/about', function(request, response) {
	response.render('main/about');
});


module.exports =router;