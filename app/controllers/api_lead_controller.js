/**
 * This controller provides functionality to munipulate the lead model
 * via an api.
 * app/controllers/api_lead_controller.js
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
		req.models.lead.find().limit(100).order('-lname').all(function (err, users) {
			if (err) return next(err);

			var userList = users.map(function (m) {
				// Return the serialized object.
				return m.serialize();
			});

			res.send(userList);
		});
	},
	'create': function (req, res, next) {
		var params = _.pick(req.body, 'fname', 'lname', 'active', 'type_id' );

		req.models.lead.create(params, function (err, newLead) {
			if(err) {
				if(Array.isArray(err)) {
					return res.send(400, { 'detail': apiHelpers.formatErrors(err) });
				} else {
					return next(err);
				}
			}

			return res.send(200, newLead.serialize());
		});
	},
	'get': function (req, res, next) {
		req.models.lead.get(req.params.id, function (err, leadObj) {
			if (err) {
				if (err.code == orm.ErrorCodes.NOT_FOUND) {
					return res.send(404, { 'detail' : 'Lead not found'});
				} else {
					console.log(err);
				return next(err);
				}
			}

			return res.send(200, _.omit(leadObj.serialize(), ['password']));
		});
	}
};
