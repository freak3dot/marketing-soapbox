/**
 * The logout controller is the controller for ending a session.
 * app/controllers/logout_controller.js
 * 
 * @module controllers
 * @author Ryan Johnston <github@shopandlearn.net>
 */

 var settings = require('../../config/settings');

module.exports = function (req, res, next) {
	req.logout();
	//req.session = null; // Deletes the cookie.
	//req.session.destroy(); // Deletes the session in the database.
	res.redirect('/');
};