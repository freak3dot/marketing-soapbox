/**
 * This controller is responsible for converting short urls into
 * redirects with tracking.
 * app/controllers/shorturl_controller.js
 * 
 * @module controllers
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var settings = require('../../config/settings'),
	partials = require('../../app/views/partials');

module.exports = function (req, res, next) {
	req.models.link.find({'shortCode': req.params.shortUrl}, 1, function (err, linkObjs) {
			linkObj = linkObjs[0];
			console.log(linkObj);

			if (typeof linkObj === 'undefined') {
				return res.send(404, 'File Not Found');
			}
			if (err) {
				if (err.code == orm.ErrorCodes.NOT_FOUND) {
					return res.send(404, 'File Not Found');
				} else {
					console.log(err);
					return next(err);
				}
			}

			return res.redirect(301, linkObj.redirect);
		});
};