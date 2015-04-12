/**
 * node tasks/defaultuser
 * @module tasks
 * @author Ryan Johnston <github@shopandlearn.net>
 */
var models = require('../app/models/');

models(function (err, db) {
	if (err) throw err;

	db.models.user.create([
		{
       'username': 'madmin',
        'password': 'password',
        'email' : 'admin@example.com',
        'createdAt' : new Date()
		}
	], function (err, items) {
		// err - description of the error or null
		if (err) throw err;

		console.log('Default user inserted into database.');
		process.exit();
		// items - array of inserted items
	});
});
