var express = require('express');
var router = express.Router();
var ssn;
let MongoClient = require('mongodb').MongoClient;
let url = process.env.MONGO_URL;

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

// good



module.exports = router;
