var authMod = function(){};

authMod.DoAuth = function(req, res, next){

	u = req.body.auth.username.toLowerCase();
	p = req.body.auth.password;

	if(u == 'daniel' && p == 'd0ctorDJ'){
		res.render('error');
	} else {
		next();
	}


};