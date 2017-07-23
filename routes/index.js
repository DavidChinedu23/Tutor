var express = require('express');
var crypto = require('crypto');
var sequelize = require('../model/user');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
     console.log("Render Welcome page ... ");
     res.render('index.ejs', { title: 'Login' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
     console.log("Renser Register page ...");
     res.render('register.ejs', { title: 'Registration', inform: 'Please type your Username and Password!' });
});

// When click Login button
router.post('/users', function(req, res) {
     var hashedPW = crypto.createHash('md5').update(req.body.pw).digest('hex');

     sequelize.findUser(req.body.user,hashedPW).then(function(result){ // khi tìm thấy user
          console.log("result = " + result);
          console.log("Render Welcome page ...");
          res.render('welcome.ejs', { username: req.body.user });
	}, function(err){ // khi không tìm thấy user hoặc các lỗi khác
          console.log("------------Error when login with error: " + err);
          console.log("Redirect to login page ...");
          res.redirect('/');
  });
});

module.exports = router;
