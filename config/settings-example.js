/**
 * Example Settings file. This will be the settings file included with
 * the project so as to not overwrite custom settings. To get the server
 * up and running. Copy this file to settings.js.
 * config/settings-example.js
 * 
 * @module config
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var path       = require('path'),
	settings = {
		'path'       : path.normalize(path.join(__dirname, '..')),
		'port'       : process.env.NODE_PORT || 3000,
		'database'   : {
			'protocol' : 'mysql',
			'query'    : { 'pool': true },
			'host'     : '127.0.0.1',
			'database' : 'db_name',
			'user'     : 'db_username',
			'password' : 'db_password'
		},
		'secret' : 'replace_with_random_string',
		'app' : {
			'title' : 'Marketing Soapbox',
		},
	};

module.exports = settings;
