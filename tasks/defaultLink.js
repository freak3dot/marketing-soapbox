/**
 * This file is used to load default link into the database via the
 * orm.
 * node tasks/defaultLink
 * @module tasks
 * @author Ryan Johnston <github@shopandlearn.net>
 */
var models = require('../app/models/');
var shortId = require('shortid');


models(function (err, db) {
	if (err) throw err;

	db.models.link.create([
		{
			'shortcode': '', // Autogenerate
			'redirect': 'http://www.newsunflowerchurch.org',
		}
	], function (err, items) {
		// err - description of the error or null
		if (err) throw err;
		console.log('Default link inserted into database.', 'http://localhost:3000/' + items[0].shortcode);
		process.exit();
		// items - array of inserted items
	});
});
