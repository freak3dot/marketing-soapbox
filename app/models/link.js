/**
 * This model will be used to store short links.
 * app/models/link.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var shortId = require('shortid');

module.exports = function (orm, db) {
	var Link = db.define(
		'link',
		{
			'shortcode': {
				'type': 'text',
				'required': true
			},
			'redirect': {
				'type': 'text',
				'required': true
			},
		},
		{
			'hooks': {
				'beforeValidate ': function () { },
				'beforeCreate': function () {
					this.shortcode = shortId.generate();
				}
			},
			'validations': {
				'username': [
					orm.enforce.ranges.length(1, undefined, "must be at least 1 chars long"),
					orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
				],
				'redirect': [
					orm.enforce.ranges.length(8, undefined, "must be at least 8 chars long"),
					orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
				],
			},
			'methods': {
				'serialize': function () {
       
					return {
						'id': this.id,
						'shortcode': this.shortcode,
						'password': this.password,
					};
				},
			}
		}
	);
};
