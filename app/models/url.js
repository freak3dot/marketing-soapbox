/**
 * This files is used to create the url model. Urls apply to leads.
 * We will allow adding multiple urls to leads.
 * app/models/url.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */

module.exports = function (orm, db) {
	var Url = db.define('url', {
		'label': {
			'type': 'text',
			'required': true
		},
		'url': {
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
			'url': [
				orm.enforce.ranges.length(1, undefined, "must be at least 1 chars long"),
				orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
			],
		},
		'methods': {
			'serialize': function () {
				return {
					'id': this.id,
					'label': this.label,
					'url': this.url,
				};
			}
		}
	});

};
