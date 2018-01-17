var express = require('express');
var app = express();
var cors = require('cors');
var util = require('util');

var originsWhitelist = [ 'http://localhost:2000', // this is my front-end url
// for development
'http://www.myproductionurl.com' ];

var corsOptions = {
	origin : function(origin, callback) {
		var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
		callback(null, isWhitelisted);
	},
	credentials : true
}

app.use(cors(corsOptions));

var bodyParser = require('body-parser')


var server = app.listen(2000, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Listening at http://%s:%s", host, port)
})