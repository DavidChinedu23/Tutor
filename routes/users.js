var express = require('express');
var router = express.Router();

/* POST user */
router.get('/user', function(req, res, next) {
  res.send('Welcome');
});

module.exports = router;
