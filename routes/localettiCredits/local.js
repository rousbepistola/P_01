var express = require('express');
var router = express.Router();
var ssn;
let MongoClient = require('mongodb').MongoClient;
let url = process.env.MONGO_URL;

router.get('/', function(req, res, next) {
  ssn = req.session;
  ssn.localettiCredit += 5;

  MongoClient.connect(url, function(err, db){
    if(err) throw err; 
    let dbo = db.db("projectOne");

  let myInfo = {email:ssn.userEmail};
        dbo.collection("userInfo").updateOne(myInfo,{$set: {lc: ssn.localettiCredit}}, function(err, data){
          if(err) throw err;
          console.log("Updated Localletti Credits");
          db.close();
        });

    })

  console.log(ssn.localettiCredit);

    res.redirect('charge');
    
  });

module.exports = router;