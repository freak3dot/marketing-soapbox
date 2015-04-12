/**
 * This files is used to create the user model. These are system users.
 * They will be used for authentication.
 * app/models/user.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var moment = require('moment'),
	crypto = require('crypto');

module.exports = function (orm, db) {
	var User = db.define(
		'user',
		{
			'username': {
				'type': 'text',
				'required': true
			},
			'password': {
				'type': 'text',
				'required': true
			},
			'email': {
				'type': 'text',
				'required': false
			},
			'createdAt': {
				'type': 'date',
				'required': true,
				'time': true
			},
			'lastLogin': {
				'type': 'date',
				'required': false,
				'time': true
			}
		},
		{
			'hooks': {
				'beforeValidate ': function () {
					//console.log(this);
					//if(!this.createdAt){
					//	this.createdAt = new Date();
					//}
				},
				'beforeCreate': function () {
					var hash = crypto.createHash('sha256').update(this.password).digest('base64');
					this.password = hash;
					this.createdAt = new Date();
				}
			},
			'validations': {
				'username': [
					orm.enforce.ranges.length(6, undefined, "must be at least 6 chars long"),
					orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
				],
				'password': [
					orm.enforce.ranges.length(8, undefined, "must be at least 8 chars long"),
					orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
				],
				'email': [
					orm.enforce.patterns.email()
				]
			},
			'methods': {
				'serialize': function () {
       
					return {
						'id'		: this.id,
						'username'	: this.username,
						'password'	: this.password,
						'email' 	: this.email,
						'createdAt'	: moment(this.createdAt).fromNow(),
						'lastLogin'	: moment(this.lastLogin).fromNow(),
						'url' : '/api/1/user/' + this.username + '/'
					};
				},
				'isValidPassword' : function(vital){
					var hash = crypto.createHash('sha256').update(vital).digest('base64');
					return hash === this.password;
				},
				'updateLastLogin' : function(){
					this.lastLogin = new Date();
					this.save();
				}
			}
		}
	);
};
