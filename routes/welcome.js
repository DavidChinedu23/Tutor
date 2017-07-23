var express = require('express');
var router = express.Router();

/* GET welcome page. */
router.get('/welcome', function(req, res, next) {
  res.render('welcome', { username: "Login" });
});

module.exports = router;