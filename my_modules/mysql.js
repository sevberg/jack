var m = require('mysql');

var c = m.createConnection({
  host     : 'localhost',
  user     : 'emj',
  password : 'password',
  database : 'everymanjack'
});

// Create Connection
c.connect(function(err){
	if(err){
		console.log( "Could not connect to DB");
	}

	console.log( "mysql connection successful");
});



module.exports = c;