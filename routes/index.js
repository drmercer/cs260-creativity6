var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/wish.html');
});

router.get('/view/:userID', function(req, res, next) {
  res.render('view', {
    userID: req.params.userID,
  });
});

module.exports = router;
