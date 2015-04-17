/**
 * This file is used to load default events into the database via the
 * orm.
 * node tasks/defaultEvents
 * @module tasks
 * @author Ryan Johnston <github@shopandlearn.net>
 */
var models = require('../app/models/');

models(function (err, db) {
	if (err) throw err;

	db.models.event.create([
		{
			'name': 'Click',
		},
		{
			'name': 'Signup',
		},
		{
			'name': 'Download',
		},
		{
			'name': 'Login',
		},
		{
			'name': 'Logout',
		},
		{
			'name': 'Submit Form',
		},
		{
			'name': 'View',
		},
		{
			'name': 'Open',
		},
		{
			'name': 'Other Event',
		}
	], function (err, items) {
		// err - description of the error or null
		if (err) throw err;

		console.log('Default events inserted into database.');
		process.exit();
		// items - array of inserted items
	});
});
