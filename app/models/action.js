/**
 * This files is used to create the action model. Actions will be
 * used for an audit log. Closely related to the activity model.
 * app/models/action.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */

module.exports = function (orm, db) {
	var Action = db.define('action', {
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
					orm.enforce.ranges.length(6, undefined, "must be at least 6 chars long"),
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
