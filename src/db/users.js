var db = require('../db');

// TODO koniecznie jakas odpowiedz
exports.createUser = function(req, done) {
	var values = [ req.body.login, req.body.email, req.body.password,
			new Date() ]

	db
			.get()
			.query(
					'insert into SMS_USERS (LOGIN, EMAIL, PASSWORD, REGISTERDATE) VALUES (?,?,?,?)',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Insert do tabeli SMS_USERS.')
					})
}

exports.getAll = function(done) {
	db
			.get()
			.query(
					'SELECT id, login, name, surname, email, password, registerdate FROM SMS_USERS',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.login = function(username, password, done) {
	var values = [ username, password ]

	db
			.get()
			.query(
					'SELECT id, login, name, surname, registerdate, email, password, phone FROM SMS_USERS where email = ? and password = ?',
					values, function(err, rows) {
						if (err)
							// TODO if error
							return done(err)
						done(null, rows)
					})
}

exports.getUser = function(id, done) {
	var values = [ id ]

	db
			.get()
			.query(
					'SELECT id, login, name, surname, email, password, registerdate, phone FROM SMS_USERS where id = ?',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('User selected')
					})
}