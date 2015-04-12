/**
 * This files is used to create the phone model. Phone numbers apply to
 * leads. We will allow adding multiple phones to leads.
 * app/models/phone.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */

module.exports = function (orm, db) {
	var Phone = db.define('phone', {
		'label': {
			'type': 'text',
			'required': true
		},
		'number': {
			'type': 'text',
			'required': true
		},
	},
	{
		'hooks': {
			'beforeValidation': function () {

			}
		},
		'validations': {
			'label': [
				orm.enforce.ranges.length(1, undefined, "must be at least 1 chars long"),
				orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
			],
			'number': [
				orm.enforce.ranges.length(1, undefined, "must be at least 1 chars long"),
				orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
			],
		},
		'methods': {
			'serialize': function () {
				return {
					'id'		 : this.id,
					'label'	: this.label,
					'number' : this.number,
				};
			}
		}
	});

};
