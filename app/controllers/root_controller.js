/**
 * The root controller is the controller for the / path on the server.
 * app/controllers/root_controller.js
 * 
 * @module controllers
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var settings = require('../../config/settings'),
	partials = require('../../app/views/partials');

module.exports = function (req, res, next) {
	console.log(partials);
	res.render('root', {
		'title': 'Login',
		'site' : settings.app.title,
		'authenticated' : req.isAuthenticated(),
		'partials' : partials()
	});
};