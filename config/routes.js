/**
 * Routes file. This file maps server paths to the appropriate
 * controllers.
 * config/routes.js
 * 
 * @module config
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var controllers = require('../app/controllers')();

module.exports = function (app, passport) {
	// Anonymous Routes
	app.get( '/', controllers.root);
	app.get( '/login/', controllers.login);
	app.post(
		'/login/',
		passport.authenticate(
			'local',
			{'failureRedirect': '/login/'}
		),
		function(req, res) {
			res.redirect('/home/');
		}
	);
	app.get( '/logout/' , controllers.logout);

	// Private Routes
	app.get('/home/',           ensureAuthenticated, controllers.home);
	app.get('/api/1/user/',     ensureAuthenticated, controllers.api_user.list);
	app.post('/api/1/user/',    ensureAuthenticated, controllers.api_user.create);
	app.get('/api/1/user/:un/', ensureAuthenticated, controllers.api_user.get);
	app.get('/api/1/lead/',     ensureAuthenticated, controllers.api_lead.list);
	app.post('/api/1/lead/',    ensureAuthenticated, controllers.api_lead.create);
	app.get('/api/1/lead/:id/', ensureAuthenticated, controllers.api_lead.get);

	// This route should be last so as to not interfere with other
	// routes.
	app.get('/:shortUrl', controllers.shorturl);

	/**
	 * Ensure the request is authenticated. If the request is
	 * authenticated (typically via persistent login session),
	 * the request will proceed. Otherwise, the user will be redirected
	 * to the login page.
	 *
	 * @param req object Request Object.
	 * @param res object Response Object.
	 * @param next function Callback function.
	 * @return function
	 */
	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) { return next(); }
		res.redirect('/login/')
	}
};
