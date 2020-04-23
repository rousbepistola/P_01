var express = require('express');
var router = express.Router();
var ssn;
let url = process.env.MONGO_URL;
let nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
    res.render('contactus');
});

module.exports = router;