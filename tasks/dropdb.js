/**
 * node tasks/dropdb
 * @module tasks
 * @author Ryan Johnston <github@shopandlearn.net>
 */
var models = require('../app/models/');

models(function (err, db) {
	if (err) throw err;

	db.drop(function (err) {
		if (err) throw err;

		db.close()
		console.log("Done!");
		process.exit();
	});
});
