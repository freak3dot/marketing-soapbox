/**
 * The home controller is the controller loads the home view.
 * app/controllers/home_controller.js
 * 
 * @module controllers
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var settings = require('../../config/settings'),
	partials = require('../../app/views/partials');

module.exports = function (req, res, next) {
	res.render('home', {
		'title': 'Home',
		'site' : settings.app.title,
		'authenticated' : req.isAuthenticated(),
		'partials' : partials(),
		'typeList' : ''
	});
};