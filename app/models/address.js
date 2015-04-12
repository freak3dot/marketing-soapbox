/**
 * This files is used to create the address model. Addresses
 * apply to leads. We will allow adding multiple addresses to leads.
 * app/models/address.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var moment = require('moment');

module.exports = function (orm, db) {
	var Address = db.define('address', {
		'line1': {
			'type': 'text',
			'required': true
		},
		'line2': {
			'type': 'text',
			'required': true
		},
		'line3': {
			'type': 'text',
			'required': true
		},
		'city' : {
			'type': 'text',
			'required': false
		},
		'state': {
			'type': 'text',
			'required': false
		},
		'zipPost': {
			'type': 'text',
			'required': false
		},
	},
	{
		'hooks': {
			'beforeValidation': function () { }
		},
		'validations': {
			'line1': [
				orm.enforce.ranges.length(1, undefined, "must be at least 1 chars long"),
				orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
			],
			'line2': [
				orm.enforce.ranges.length(1, undefined, "must be at least 1 chars long"),
				orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
			],
			'city': [
				orm.enforce.ranges.length(1, undefined, "must be at least 1 chars long"),
				orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
			],
			'state': [
				orm.enforce.ranges.length(1, undefined, "must be at least 1 chars long"),
				orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
			],
			'zipPost': [
				orm.enforce.ranges.length(1, undefined, "must be at least 1 chars long"),
				orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
			]
		},
		'methods': {
			'serialize': function () {
				return {
					'id': this.id,
					'line1': this.line1,
					'line2': this.line2,
					'line3': this.line3,
					'city': this.city,
					'state': this.state,
					'zipPost': this.zipPost,
				};
			}
		}
	});

};
