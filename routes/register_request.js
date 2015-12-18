var express = require('express');
var router = express.Router();

var checkVal = function( val, rx ){

	var RX = new RegExp(rx);

	if( val == ""){
		return false;
	}
	if(typeof val == 'undefined'){
		return false;
	}
	if( !RX.test(val) ){
		return false;
	}

	return true;
}

/* GET home page. */
router.post('/', function(req, res, next) {

	// Check all inputs
	if(!checkVal(req.body.name, "^[a-zA-Z ]{0,100}$")) return res.send("fail");
	if(!checkVal(req.body.contact, "^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$")) return res.send("fail");
	if(!checkVal(req.body.job_location, "^[a-zA-Z0-9-,. ]{0,150}$")) return res.send("fail");
	if(!checkVal(req.body.job_type)) return res.send("fail");
	if(!checkVal(req.body.job_desc)) return res.send("fail");

	// Create query
	var tmp = 'INSERT INTO requests (name, contact, address, job_type, description, ip_addr) VALUES (';

	tmp += "\"" + req.body.name + "\", ";
	tmp += "\"" + req.body.contact + "\", ";
	tmp += "\"" + req.body.job_location + "\", ";
	tmp += "\"" + req.body.job_type + "\", ";
	tmp += "\"" + req.body.job_desc + "\", ";
	tmp += "\"" + req.connection.remoteAddress + "\");";
	
	console.log(tmp);

	req.emjdb.query( tmp, function(err) {

		console.log(err);

		if(err){
			return res.send("fail");
		}

		return res.send("success");

	});
	

});

module.exports = router;