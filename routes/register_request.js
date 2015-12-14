var express = require('express');
var router = express.Router();

var checkVal = function( val ){
	if( val == "" ){
		return false;
	}

	return true;
}

/* GET home page. */
router.post('/', function(req, res, next) {
	// Check all inputs
	if(!checkVal(req.body.name)) return res.send("fail");
	if(!checkVal(req.body.contact)) return res.send("fail");
	if(!checkVal(req.body.job_location)) return res.send("fail");
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