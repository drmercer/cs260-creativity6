var express = require('express');
var router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({})
  .then(users => res.json(users))
  .catch(err => res.status(500).json(err));
});

module.exports = router;
