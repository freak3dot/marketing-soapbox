var fs = require('fs');

module.exports = function(){
	var partialList = {};
	fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        partialList[name] = 'partials/' + name;
    });
    return partialList;
};




