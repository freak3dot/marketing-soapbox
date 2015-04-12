/**
 * This is a clever little script to load in all the controllers.
 * It doesn't matter what order we load the controllers, so this script
 * loads all files in the controller directory. It excludes
 * itself (this file) and the _apiHelpers.js files.
 * app/controllers/index.js
 * 
 * @module controllers
 * @author Ryan Johnston <github@shopandlearn.net>
 */

var fs = require('fs');

module.exports = function(){
	var controllerList = {};
	fs.readdirSync(__dirname).forEach(function(file) {
		if (file == "index.js") return;
		if (file == "_apiHelpers.js") return;

		var name = file.substr(0, file.indexOf('_controller')),
			fileName = file.substr(0, file.indexOf('.'));
		controllerList[name] = require('./' + fileName);
	});
	return controllerList;
};