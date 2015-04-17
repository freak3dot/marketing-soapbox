/**
 * This files is used to create the event model. Events will be
 * used for logging what leads do.
 * app/models/event.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var moment = require('moment');

module.exports = function (orm, db) {
	var Event = db.define('event', {
		'eventDate' : {
			'type': 'date',
			'required': true,
			'time': true
		}
	},
	{
		'hooks': {
			'beforeValidation': function () {
				if (this.eventDate == null || this.eventDate == undefined ){
					this.eventDate = new Date();
				}
			}
		},
		'validations': {

		},
		'methods': {
			'serialize': function () {

				return {
					'id': this.id,
					'eventDate': moment(this.eventDate).fromNow(),
				};
			}
		}
	});

	Event.hasOne('lead', db.models.lead, { 'required': true, 'alwaysValidate': true, 'reverse': 'lead', 'autoFetch': true });
	Event.hasOne('eventType', db.models.eventType, { 'required': true, 'alwaysValidate': true, 'reverse': 'type', 'autoFetch': true });

};