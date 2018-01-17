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
var db = require('./db');

var users = require('./db/users');
app.post('/users', function(req, res) {
	console.log('/users')

	users.createUser(req, function(err, rows) {
		console.log('Err=' + err)
		console.log('rows=' + rows)
		//TODO Michal NOK gdy juz jest taki user?
		
		res.send('OK');
	});
})

app.post('/login', function(req, res) {

	console.log('----------------------------------------------')
	console.log('Proba zalogowania, username=' + req.body.username
			+ ' password=' + req.body.password);

	var result = users.login(req.body.username, req.body.password, function(
			err, rows) {

		// TODO if error

		if (rows) {
			var util = require('util');

			console.log(util.inspect(rows, {
				showHidden : true,
				depth : null
			}));
		}
		if (rows == 0) {
			console.log('Nieprawidlowe dane logowania.')

			res.status(400).send({
				message : 'nieprawidlowe dane logowania'
			});
		} else {
			console.log('rows=' + rows[0])
			console.log('Zalogowano uzytkownika: ' + req.body.username)

			console.log('Znalazlem tyle wierszy=' + rows.length)
//			res.send(rows[0]);
			if (rows.length == 1) {
				var row = rows[0];
				res.send(rows[0]);
				
				console.log('Wyslano.')
			}
		}

	});

	console.log('Rezultat=' + result)

})

app.get('/users', function(req, res) {
	console.log('/users')

	users.getAll(function(err, rows) {
		res.send(rows);
	});
})

// todo michal co jesli nic nie znaleziono?
app.get('/user', function(req, res) {
	console.log('/user')

	users.getUser(req.query.id, function(err, rows) {

		if (rows == 0) {
			console.log('Nic nie znalazlem.')
		}

		if (rows) {
			var util = require('util');

			console.log(util.inspect(rows, {
				showHidden : true,
				depth : null
			}));

			if (rows.length == 1) {
				var row = rows[0];
				res.send(rows[0]);
			}
		}

	});
})

db.connect();

var server = app.listen(2000, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Listening at http://%s:%s", host, port)
})