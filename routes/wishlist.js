var express = require('express');
var router = express.Router();

// Authentication checker middleware
router.use(require('./authChecker'));

router.get('/test', function(req, res, next) {
	res.send("Hello world!");
})

module.exports = router;
