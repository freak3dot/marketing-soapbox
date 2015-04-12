/**
 * This file provides helper functions related to the api.
 * app/controllers/_apiHelpers.js
 * 
 * @module controllers
 * @author Ryan Johnston <github@shopandlearn.net>
 */

module.exports = {
	'formatErrors': function (errorsIn) {
		var errors = {},
			a, e;

		for (a = 0; a < errorsIn.length; a++) {
			e = errorsIn[a];

			errors[e.property] = errors[e.property] || [];
			errors[e.property].push(e.msg);
		}
		return errors;
	}
};