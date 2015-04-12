var path = require('path'),
	express = require('express'),
	passport  = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	settings = require('./config/settings'),
	environment = require('./config/environment'),
	routes = require('./config/routes'),
	models = require('./app/models/'),
	passportConfig = require('./config/passport');
/*
	//Creating a Secure Server
	var https = require('https'),
		http = require('http'),
		fs = require('fs'),
		options = {
			'key': fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
			'cert': fs.readFileSync('test/fixtures/keys/agent2-cert.pem'),
			'ca': fs.readFileSync('test/fixtures/ssl/gd_bundle.crt'),
			'requestCert':        true//,
			//'rejectUnauthorized': false
		};
*/

module.exports.start = function (done) {
	var app = express();

	passportConfig(passport);
	environment(app);
	// pass passport for configuration
	routes(app, passport);

	app.listen(settings.port, function () {
		console.log( ('Listening on port ' + settings.port) );

		if (done) {
		  return done(null, app, server);
		}
	}).on('error', function (e) {
		if (e.code == 'EADDRINUSE') {
			console.log('Address in use. Is the server already running?');
		}
		if (done) {
			return done(e);
		}
	});
	// Create an HTTPS service identical to the HTTP service.
	//https.createServer(options, app).listen(443);
};

// If someone ran: "node server.js" then automatically start the server
if (path.basename(process.argv[1],'.js') == path.basename(__filename,'.js')) {
	module.exports.start();
}