var express = require('express');
var router = express.Router();
var ssn;
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://rousbepistola:3te5hrlns2gy@cluster0-1lsui.azure.mongodb.net/test?retryWrites=true&w=majority";


/* GET home page. */
router.get('/', function(req, res, next) {
  ssn = req.session;
  if(ssn.signUpError){
    res.render('index', { 
      loginError: ssn.signUpError
    });
  }else if(ssn.loginfirst){
    res.render('index', { 
      loginError: ssn.loginfirst 
    });
  } else if(ssn.loginError){
    res.render('index', { 
      loginError: ssn.loginError
    });
  } else {
    res.render('index');
  }
  
});

module.exports = router;
