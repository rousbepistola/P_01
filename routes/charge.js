var express = require('express');
var router = express.Router();
var ssn;
const stripe = require('stripe')(process.env.STRIPE_TEST_SK);
const bodyParser = require('body-parser');


//variable reqs
let MongoClient = require('mongodb').MongoClient;
let url = process.env.MONGO_URL;
const bcrypt = require('bcrypt');


router.get('/', function(req, res, next) {


    ssn = req.session;

    console.log(ssn.localettiCredit, "credit is <<<<<<<<<<");

    res.render('charge', {
      name: ssn.firstName, 
      mail: ssn.userEmail,
      lc: ssn.localettiCredit


    });

});


router.post('/', function(req, res, next) {



});






module.exports = router;