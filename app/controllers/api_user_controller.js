/**
 * This controller provides functionality for munipulating the user
 * model via api.
 * app/controllers/api_user_controller.js
 * 
 * @module controllers
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var settings = require('../../config/settings'),
	partials = require('../../app/views/partials'),
	_        = require('underscore'),
	orm      = require('orm'),
	apiHelpers = require('./_apiHelpers');

module.exports = {
	'list': function (req, res, next) {
		req.models.user.find().limit(100).order('-username').all(function (err, users) {
		if (err) return next(err);

		var userList = users.map(function (m) {
			// Return the serialized object.
			// Omit the password because the hash is of no use to api user.
			return _.omit(m.serialize(), ['password']);
		});

		res.json(userList);
		});
	},
	'create': function (req, res, next) {
		var params = _.pick(req.body, 'username', 'password', 'email' );
		params.createdAt = new Date();

		req.models.user.find({'username': params.username}, 1, function (err, userObjs) {

			if (userObjs.length != 0) {
				res.json(409, 'User with username already exists.');
			}

			req.models.user.create(params, function (err, newUser) {
				if(err) {
					if (Array.isArray(err)) {
						return res.send(400, { 'detail': apiHelpers.formatErrors(err) });
					} else {
						return next(err);
					}
				}

				return res.json(201, newUser.serialize());
			});
		});
	},
	'get': function (req, res, next) {
		req.models.user.find({'username': req.params.un}, 1, function (err, userObjs) {

			userObj = userObjs[0];
			if (err) {
				if (err.code == orm.ErrorCodes.NOT_FOUND) {
					return res.send(404, { 'detail' : 'User not found'});
				} else {
					console.log(err);
					return next(err);
				}
			}

			return res.json(200, _.omit(userObj, ['password']));
		});
	}
};
