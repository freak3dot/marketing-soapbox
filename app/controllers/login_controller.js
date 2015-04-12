/**
 * The login controller displays the login form using the login
 * template.
 * app/controllers/login_controller.js
 * 
 * @module controllers
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var settings = require('../../config/settings'),
	partials = require('../../app/views/partials');

module.exports = function (req, res, next) {
	res.render('login', {
		'title': 'Login',
		'site' : settings.app.title,
		'authenticated' : req.isAuthenticated(),
		'partials' : partials()
	});
};