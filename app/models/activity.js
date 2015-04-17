/**
 * This files is used to create the activity model. Activity will be
 * used for an audit log.
 * app/models/activity.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var moment = require('moment');

module.exports = function (orm, db) {
	var Activity = db.define('activity', {
		'activityDate' : {
			'type': 'date',
			'required': true,
			'time': true
		}
	},
	{
		'hooks': {
			'beforeValidation': function () {
				this.activityDate = new Date();
			}
		},
		'validations': {

		},
		'methods': {
			'serialize': function () {

				return {
					'id': this.id,
					'actionDate': moment(this.actionDate).fromNow(),
				};
			}
		}
	});

	Activity.hasOne('user', db.models.user, { 'required': true, 'alwaysValidate': true, 'reverse': 'user', 'autoFetch': true });
	Activity.hasOne('action', db.models.action, { 'required': true, 'alwaysValidate': true, 'reverse': 'action', 'autoFetch': true });

};