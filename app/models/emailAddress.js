/**
 * This files is used to create the email address model. Email addresses
 * apply to leads. We will allow adding multiple email addresses to
 * leads.
 * app/models/emailAddress.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */
 
module.exports = function (orm, db) {
	var EmailAddress = db.define('emailAddress', {
		'label': {
			'type': 'text',
			'required': true
		},
		'address': {
			'type': 'text',
			'required': true
		},
	},
	{
		'hooks': {
			'beforeValidation': function () { }
		},
		'validations': {
			'label': [
				orm.enforce.ranges.length(1, undefined, "must be at least 1 chars long"),
				orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
			],
			'address': [
				orm.enforce.ranges.length(1, undefined, "must be at least 1 chars long"),
				orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
			],
		},
		'methods': {
			'serialize': function () {
				return {
					'id': this.id,
					'label': this.label,
					'address': this.address,
				};
			}
		}
	});

};
