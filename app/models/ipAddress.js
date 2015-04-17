/**
 * This files is used to create the ip address model.
 * A lead can have many ip addresses.
 * app/models/ipAddress.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */


module.exports = function (orm, db) {
	var ipAddress = db.define(
		'ipAddress',
		{
			'ipAddress': {
				'type': 'binary',
				'required': true
			},
		},
		{
			'hooks': {
				'beforeValidate ': function () { },
				'beforeCreate': function () { }
			},
			'validations': {
			},
			'methods': {
				'serialize': function () {
					return {
						'id': this.id,
						'ipAddress': this.ipAddress,
					};
				},
			}
		}
	);
};
