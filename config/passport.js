/**
 * Authentication via passport library.
 * config/passport.js
 * 
 * @module config
 * @author Ryan Johnston <github@shopandlearn.net>
 */

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================


	/**
	 * To support persistent login sessions, Passport needs to be able to
	 * serialize users into and deserialize users out of the session. Typically,
	 * this will be as simple as storing the user ID when serializing, and finding
	 * the user by ID when deserializing.
	 */
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(req, id, done) {
		// ****************** find user in orm???? ******************
		// http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local
		req.models.user.find({ 'id': id }, function (err, users) {
			// SQL: "SELECT * FROM user WHERE id=1"
			if (err) { return done(err); }
			if (!users) { return done(null, false, { 'message': 'Unknown user id: ' + id }); }
			return done(null, users[0]);
		});
	});

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	// Use the LocalStrategy within Passport.
	// Strategies in passport require a `verify` function, which accept
	// credentials (in this case, a username and password), and invoke a callback
	// with a user object.
	passport.use(new LocalStrategy(
		{
			'usernameField': 'u',
			'passwordField': 'v',
			'passReqToCallback' : true
		},
		function(req, username, password, done) {
			// asynchronous verification, for effect...
			process.nextTick(function () {
				// Find the user by username. If there is no user with the given
				// username, or the password is not correct, set the user to `false` to
				// indicate failure and set a flash message. Otherwise, return the
				// authenticated `user`.
				req.models.user.find({ 'username': username }, function (err, users) {
					// SQL: "SELECT * FROM user WHERE username='Doe'"
					if (err) { return done(err); }
					if (users.length == 0) { return done(null, false, { 'message': 'Unknown user ' + username }); }
					if (!users[0].isValidPassword(password)) { return done(null, false, { 'message': 'Invalid password' }); }
					return done(null, users[0]);
				});

			});
		}
	));

};