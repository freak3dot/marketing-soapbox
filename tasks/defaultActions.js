/**
 * This file is used to load default actions into the database via the
 * orm.
 * node tasks/defaultActions
 * @module tasks
 * @author Ryan Johnston <github@shopandlearn.net>
 */
var models = require('../app/models/');

models(function (err, db) {
	if (err) throw err;

	db.models.action.create([
		{
			'name': 'Login',
		},
		{
			'name': 'Create',
		},
		{
			'name': 'Edit',
		},
		{
			'name': 'Delete',
		},
		{
			'name': 'Logout',
		}
	], function (err, items) {
		// err - description of the error or null
		if (err) throw err;

		console.log('Default actions inserted into database.');
		process.exit();
		// items - array of inserted items
	});
});
