var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'sesemesuser',
  password: 'sesemesuser3306',
  database: 'sesemes'
})

connection.connect(function(err) {
  if (err) {
	  console.log('Wystapil blad przy probie polaczenia z baza danych. '  + err)
	  throw err
  }
  
  console.log('Polaczono z baza danych.')
})

exports.connect = function() {
  state.pool = mysql.createPool({
    host: 'localhost',
    user: 'sesemesuser',
    password: 'sesemesuser3306',
    database: 'sesemes'
  })

  console.log('Polaczono z baza danych.')
}

exports.get = function() {
  return state.pool
}

var state = {
  pool: null,
  mode: null,
}