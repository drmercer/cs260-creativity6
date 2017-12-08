var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
	if (!req/*TODO assert authorized*/) {
		res.sendStatus(403);
	} else {
		next();
	}
})

router.get('/test', function(req, res, next) {
	res.send("Hello world!");
})

module.exports = router;
