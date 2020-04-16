var express = require('express');
var router = express.Router();
var ssn;
const stripe = require('stripe')('sk_test_hVvxDocLHrnYccM7y2PW9U9K00tS7SXwUR');
const bodyParser = require('body-parser');


//variable reqs
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://rousbepistola:3te5hrlns2gy@cluster0-1lsui.azure.mongodb.net/test?retryWrites=true&w=majority";
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