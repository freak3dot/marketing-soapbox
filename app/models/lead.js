/**
 * This files is used to create the lead model. Leads will be visitors
 * to our site and/or users of our shortlinks. In future versions of
 * this system a lead may be a much more robust object.
 * app/models/lead.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var shortId = require('shortid');

module.exports = function (orm, db) {
	var Lead = db.define(
	'lead',
	{
		'uid': {
			'type': 'text'
		},
	},
	{
		'hooks': {
			'beforeValidation': function () { },
			'beforeCreate': function () {
				console.log(this.uid);
				if (this.uid == null || this.uid == ''){
					this.uid = shortId.generate();
				}
			},
		},
		'validations': {
		},
		'methods': {
			'serialize': function () {
				return {
					'id': this.id,
				};
			}
		}
	});

	Lead.hasMany('ipAddress', db.models.ipAddress, {}, { 'required': false, 'alwaysValidate': false, 'reverse': 'leads', 'autoFetch': true });
	Lead.hasMany('address', db.models.address, {}, { 'required': false, 'alwaysValidate': false, 'reverse': 'leads', 'autoFetch': true });
	Lead.hasMany('phone', db.models.phone, {}, { 'required': false, 'alwaysValidate': false, 'reverse': 'leads', 'autoFetch': true });
	Lead.hasMany('emailAddress', db.models.email, {}, { 'required': false, 'alwaysValidate': false, 'reverse': 'leads', 'autoFetch': true });
	Lead.hasMany('url', db.models.url, {}, { 'required': false, 'alwaysValidate': false, 'reverse': 'leads', 'autoFetch': true });
};
