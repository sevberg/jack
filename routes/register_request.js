var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	console.log(req);

	return res.render('calljack');
});

module.exports = router;