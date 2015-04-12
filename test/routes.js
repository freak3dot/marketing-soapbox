var should = require('should'),
	assert = require('assert'),
	request = require('supertest'),
	url = 'http://localhost:3000',
	server = request.agent(url);
	//config = require('./config-debug')
 
describe('Routing', function() {

	// User Tests
	describe('User', function () {
		var profile = {
			'username': 'ljohnston',
			'password': 'testpass',
			'email': 'github@shopandlearn.net'
		};

		it('should require login', function (done) {
			server
				.get('/api/1/user/')
				.expect(302) //Status code
				.end(function(err,res) {
					if (err) {
						throw err;
					}

					done();
				});
		});

		it('login', loginUser());
		it('should create when posting to the api', function (done) {

			server
				.post('/api/1/user/')
				.send(profile)
				.expect('Content-Type', /json/)
				.expect(201)
				.end(function(err, res) {
					if (err) {
						throw err;
					}

					done();
				});
		});

		it('should not allow a user with existing username', function (done) {

			server
				.post('/api/1/user/')
				.send(profile)
				.expect('Content-Type', /json/)
				.expect(409)
				.end(function(err, res) {
					if (err) {
						throw err;
					}

					done();
				});
		});

		it('should get an existing user', function(done){
			server
				.get('/api/1/user/' + profile.username + '/')
				.expect('Content-Type', /json/)
				.expect(200) //Status code
				.end(function(err,res) {
					if (err) {
						throw err;
					}

					res.body.should.have.property('id');
					res.body.should.not.have.property('password');
					res.body.username.should.equal(profile.username);
					res.body.email.should.equal(profile.email);
					res.body.createdAt.should.not.equal(null);
					done();
				});
		});
	});
});


function loginUser() {
	return function(done) {
		server
			.post('/login/')
			.send({
				'u': 'madmin',
				'v': 'password'
			})
			.expect(302)
			.expect('Location', '/home/')
			.end(onResponse);

		function onResponse(err, res) {
		   if (err) return done(err);
		   return done();
		}
	};
};