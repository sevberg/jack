var express = require('express');
var router = express.Router();

router.get('/',function(req, res){


	res.render('check_requests');

});


var WriteRequest = function(data){


	var r = '<div class="row">';
	r += '<h3>' + data.name + '  -  ' + data.job_type + '</h3>';
	r += '<p>Address: ' + data.address + '</p><br/>'; 
	r += '<p>Contact: ' + data.contact + '</p><br/>'; 
	r += '<p>Created: ' + data.created + '</p><br/>'; 
	r += '<p>IP Addr: ' + data.ip_addr + '</p><br/>'; 
	r += '<p>Details: ' + data.description + '</p><br/>';
	r += '</div>';

	r += '<p>-----------------------------------------------------------</p>' 


	return r;
};

router.post('/', function( req, res){
	if( req.body.maxTime != -1 ){
		var q = "SELECT * FROM requests WHERE created >= CURRENT_TIMESTAMP - INTERVAL TIME-INTERVAL MINUTE ORDER BY CREATED DESC;"
		q = q.replace("TIME-INTERVAL", req.body.maxTime);
	} else {
		var q = "SELECT * FROM requests ORDER BY created DESC;";
	}

	req.emjdb.query(q, function(err, sql){
		if( err ) return res.send("error :(");

		if(sql.length == 0) res.send("Empty Set");
		else {
			var r = "";
			for( i=0; i<sql.length; i++){
				r += WriteRequest( sql[i] );
			}

			return res.send(r);
		}
	});
});

module.exports = router;