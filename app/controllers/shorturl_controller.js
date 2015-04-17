/**
 * This controller is responsible for converting short urls into
 * redirects with tracking.
 * app/controllers/shorturl_controller.js
 * 
 * @module controllers
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var settings = require('../../config/settings'),
	partials = require('../../app/views/partials'),
	ip = require('ip');

module.exports = function (req, res, next) {
	req.models.link.find({'shortCode': req.params.shortUrl}, 1, function (err, linkObjs) {
			linkObj = linkObjs[0];

			if (typeof linkObj === 'undefined') {
				return next();
			}
			if (err) {
				if (err.code == orm.ErrorCodes.NOT_FOUND) {
					return next();
				} else {
					console.log(err);
					return next(err);
				}
			}

			var sess = req.session;

			if (sess.lead) {
				add_shortlink_click(sess.lead, next);
			} else {
				// Atempt to look up lead via ip
				req.models.ipAddress.find({'ipAddress': ip.toBuffer(req.ip) }, 1, function (err, ipObjs) {

					if (ipObjs.length == 0) {
						// Create the lead.
						req.models.lead.create({}, function (err, newLead) {
							// Assign lead to this session.
							sess.lead = newLead;
							// Add IP.
							console.log(err);
							console.log(newLead);
							console.log(ip.toBuffer(req.ip));
							req.models.ipAddress.create(
								{'ipAddress': ip.toBuffer(req.ip)},
								function (err, newIP) {
									console.log(err);
									console.log(newIP);
									newLead.addIpAddress(newIP, function (err) {
										// Add event
										add_shortlink_click(newLead, next);
									});
								}
							);
						});
					} else {
						console.log(ipObjs);
						// Assign lead to this session.
						sess.lead = ipObjs[0].leads[0];
						// Assign the click to the first lead
						// that had this ip.
						add_shortlink_click(ipObjs[0].leads[0], next);
					}
				});
			}


			/**
			 * Add event to lead. Lead clicked shortlink.
			 */
			var add_shortlink_click = function (lead, next) {
				req.models.eventType.find({'name': 'Click' }, 1, function (err, typeObjs) {
					console.log(typeObjs);
					if (typeObjs.length == 0) {
						console.log('Event type of click not found in database.');
						return next();
					} else {
						req.models.event.create(
							{
								'lead_id': lead.id,
								'eventtype_id': typeObjs[0].id,
							},
							function(err, newEvent) {
								console.log(err);
								console.log(newEvent);
								return res.redirect(301, linkObj.redirect);
							}
						);
					}

				});
			};

		});
};