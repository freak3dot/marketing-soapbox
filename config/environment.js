/**
 * Set up the environment on the server.
 * Initializes libraries such as express, passport, and handlebars.
 * config/environment.js
 * 
 * @module config
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var path = require('path'),
	express = require('express'),
	settings = require('./settings'),
	models = require('../app/models/'),
	passport = require('passport'),
	compression = require('compression'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	routes = require('../config/routes'),

// The `consolidate` adapter module  
	cons = require('consolidate');


module.exports = function (app) {
	var oneDay = 86400000;

	// Trust proxy, this will be run behind nginx.
	app.enable('trust proxy');

	// Switch off the default 'X-Powered-By: Express' header
	app.use(function (req, res, next) {
		res.setHeader( 'X-Powered-By', settings.app.title );
		next();
	});

	//canonical
	app.use(removeWWW);

	// Static files (css, js, images)
	app.use(express.static(path.join(settings.path, 'public'), { 'maxAge': oneDay }));

	// View Directory
	app.set('views', './app/views');

	// .hbs files should be handled by `handlebars`
	// `consolidate` takes care of loading `handlebars` and interfacing it with Express
	app.engine('hbs', cons.handlebars);

	// we set 'hbs' as the default extension of template files
	// this is optional, but you have to specify the view files's extension if you don't
	// it defaults to 'jade'
	app.set('view engine', 'hbs');

	//app.use(express.logger({ 'format': 'dev' }));
	app.use(cookieParser());
	app.use(bodyParser({
		'extended': false
	}));
	app.use(methodOverride());
	app.use(session({
		'secret': settings.secret,
		'resave': false,
		'saveUninitialized': false
	}));
	app.use(compression()); //gzip the response

	// Add models and db to the request
	app.use(function (req, res, next) {
		models(function (err, db) {
			if (err) return next(err);
			req.models = db.models;

			req.db = db;

			return next();
		});
	});

	// Authentication
	app.use(passport.initialize());
	app.use(passport.session());

	// Route urls
	// app.use(app.router); // Deprecated in express 3.x to 4.x migration
	routes(app, passport);

	var partials = require('../app/views/partials');
	// Last non-error handling middleware - assume 404
	app.use(function(req, res, next){
		res.status(404);

		// respond with html page
		if (req.accepts('html')) {
			res.render(
				'404',
				{
					'title': '404 Not Found',
					'site' : settings.app.title,
					'authenticated' : req.isAuthenticated(),
					'partials' : partials(),
					'url': req.url
				}
			);
			return;
		}

		// respond with json
		if (req.accepts('json')) {
			res.send({ 'detail': 'Not found' });
			return;
		}

		// default to plain-text. send()
		res.type('txt').send('404 Not found');
	});

	// Server Error handling middleware
	app.use(function(err, req, res, next){

		console.log(err);
		res.status(err.status || 500);

		// Add some friendly messages for known errors
		if (err.errno === 'ECONNREFUSED'){
			err.message = 'Could not connect to database. Check your database configuration.';
		}
		
		res.render('500', {
			'title': '500 Server Error',
			'site' : settings.app.title,
			'authenticated' : req.isAuthenticated(),
			'partials' : partials(),
			'status': err.status || 500,
			'error': err
		});
	});


};


	/**
	 * Remove the www from the url. This is used to ensure canonical
	 * urls for SEO purposes.
	 *
	 * @param req object Request Object.
	 * @param res object Response Object.
	 * @param next function Callback function.
	 * @return function
	 */
function removeWWW(req, res, next){
	if (req.host.match(/^www/) !== null ) {
		res.redirect(
			301,
			req.protocol + '://' + req.host.replace(/^www\./, '') + req.url
		);
	} else {
		next();
	}
}