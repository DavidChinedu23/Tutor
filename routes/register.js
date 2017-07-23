var express = require('express');
var crypto = require('crypto');
var sequelize = require('../model/user');
//var flash = require('express-flash');
var router = express.Router();

// When user click button Register
router.post('/registration',function(req,res){
	var hashedPW = crypto.createHash('md5').update(req.body.pw).digest('hex');

	sequelize.findUsername(req.body.user).then(function(result){ // When username found
		// Log out Error user already had
		console.log("------Add new user failed: " + req.body.user);
		res.render('register.ejs', {title: 'Register', inform: 'Username has already been used! Please choose another username!'})
	}, function(err){ // when no user found
		// Insert into database with user and pw
		sequelize.insertUser(req.body.user,hashedPW);
		// return to Login page
		res.redirect('/');
	});
});

module.exports = router;
