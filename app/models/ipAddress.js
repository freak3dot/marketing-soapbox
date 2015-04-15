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
				'username': [
					orm.enforce.ranges.length(6, undefined, "must be at least 6 chars long"),
					orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
				],
			},
			'methods': {
				'serialize': function () {
					return {
						'id'		: this.id,
						'ipAddress'	: this.ipAddress,
					};
				},
			}
		}
	);
};
