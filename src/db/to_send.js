var db = require('../db');

exports.getAll = function(done) {
	db
			.get()
			.query(
					'SELECT ID, FK_USER, MESSAGE, REQUESTDATE, RECEIVERS FROM SMS_TO_SEND',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

exports.getForSend = function(done) {
	
	var values = [ new Date() ]
	db
	.get()
	.query(
			'SELECT ID, FK_USER, MESSAGE, REQUESTDATE, RECEIVERS FROM SMS_TO_SEND WHERE SEND_DATE IS NULL OR SEND_DATE <= ?',
			values, function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
			})
} 

exports.insert = function(req, done) {
	if (req.body.send_date) {
		console.log('With send_date.')
		
		var values = [ req.body.fk_user, req.body.message, new Date(),
				req.body.receivers, req.body.send_date ]

		db
				.get()
				.query(
						'insert into SMS_TO_SEND (FK_USER, MESSAGE, REQUESTDATE, RECEIVERS, SEND_DATE) VALUES (?,?,?,?,?)',
						values, function(err, result) {
							if (err)
								return done(err)
							done(null, result)

							console.log('Insert do tabeli SMS_TO_SEND.')
						})
	} else {
		console.log('Without send_date.')
		
		var values = [ req.body.fk_user, req.body.message, new Date(),
				req.body.receivers ]

		db
				.get()
				.query(
						'insert into SMS_TO_SEND (FK_USER, MESSAGE, REQUESTDATE, RECEIVERS) VALUES (?,?,?,?)',
						values, function(err, result) {
							if (err)
								return done(err)
							done(null, result)

							console.log('Insert do tabeli SMS_TO_SEND.')
						})
	}

}

exports.deleteAll = function(done) {

	db.get().query('DELETE FROM SMS_TO_SEND', function(err, result) {
		if (err)
			return done(err)
		done(null, result)

		console.log('Usunieto wszystko z tabeli SMS_TO_SEND.')
	})
}

exports.deleteSms = function(id, done) {
	var values = [ id ]

	db.get().query('DELETE FROM SMS_TO_SEND WHERE ID = ?', values,
			function(err, result) {
				if (err)
					return done(err)
				done(null, result)

				console.log('Usunieto sms z tabeli SMS_TO_SEND.')
			})
}