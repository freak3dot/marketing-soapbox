/**
 * This files is used to import the models. We must be careful of the
 * order we import models due to many-to-many relationships.
 * app/models/index.js
 * 
 * @module models
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var orm = require('orm'),
	settings = require('../../config/settings'),
	_ = require('underscore'),
	connection = null;

function setup(db, cb) {
	var models = [

		'emailAddress',
		'phone',
		//'email',
		'url',

		'lead',

		'link',

		'action',
		'user',
		'activity',

	];
	_(models).each(function(file){
		require('./' + file)(orm, db);
	});

	return cb(null, db);
}

module.exports = function (cb) {
	if (connection) return cb(null, connection);

	orm.connect(settings.database, function (err, db) {
		if (err) return cb(err);

		db.settings.set('instance.returnAllErrors', true);
		setup(db, cb);
	});
};
