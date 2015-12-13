var express = require('express');
var router = express.Router();

router.get('/',function(req, res){


	res.render('check_requests');

});


var WriteRequest = function(data){


	var r = '<div class="row">';
	r += '<h3>' + data.NAME + '  -  ' + data.JOB_TYPE + '</h3>';
	r += '<p>Address: ' + data.ADDRESS + '</p><br/>'; 
	r += '<p>Contact: ' + data.CONTACT + '</p><br/>'; 
	r += '<p>Created: ' + data.CREATED + '</p><br/>'; 
	r += '<p>IP Addr: ' + data.IP_ADDR + '</p><br/>'; 
	r += '<p>Details: ' + data.DESCRIPTION + '</p><br/>';
	r += '</div>';

	r += '<p>-----------------------------------------------------------</p>' 


	return r;
};

router.post('/', function( req, res){
	if( req.body.maxTime != -1 ){
		var q = "SELECT * FROM requests WHERE CREATED >= CURRENT_TIMESTAMP - INTERVAL TIME-INTERVAL MINUTE ORDER BY CREATED DESC;"
		q = q.replace("TIME-INTERVAL", req.body.maxTime);
	} else {
		var q = "SELECT * FROM requests ORDER BY CREATED DESC;";
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