/**
 * This files is used to create the eventType model. Event types houses
 * a list of event types. Clicks, visits, etc.
 * app/models/action.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */

module.exports = function (orm, db) {
	var eventType = db.define('eventType', {
		'name': {
			'type': 'text',
			'required': true
		},
	},
	{
		'hooks': {
			'beforeValidation': function () { }
		},
		'validations': {
				'name': [
					orm.enforce.ranges.length(3, undefined, "must be at least 3 chars long"),
					orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
				],
		},
		'methods': {
			'serialize': function () {

				return {
					'id': this.id,
					'name': this.name,
				};
			}
		}
	});
};
