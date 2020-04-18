var express = require('express');
var router = express.Router();
var ssn;
let MongoClient = require('mongodb').MongoClient;
let url = process.env.MONGO_URL;
const bcrypt = require('bcrypt');


router.post('/', function(req, res, next){
    console.log("Login Processor entered");

    ssn = req.session;

    var logemail = req.body.email;
    var logpass = req.body.pass;
    let passwordMatched;


    MongoClient.connect(url, function(err, db){
        if(err) throw err;


        
        let dbo = db.db("projectOne");
        let myinfo = {email:logemail};

        dbo.collection("userInfo").findOne(myinfo, function(err, data){

            try {
                    // comparing hashed password
            if( bcrypt.compareSync(logpass, data.pass) ) {
                // Passwords match
                passwordMatched = true;
            } else {
                // Passwords don't match
                passwordMatched = false;
            }
            // end of comparing hashed password
            } catch (error) {
                console.log("no data returned. user does not exist");
                ssn.loginError = "User credentials does not exist";
                ssn.errorNumber = 3;
                console.log("data returned null == user may not exist or password does not match");
                res.redirect('/');
            };
                        
        


            if(passwordMatched == false){
                ssn.loginError = "User credentials does not exist";
                ssn.errorNumber = 3;
                console.log("password does not match with email");
                res.redirect('/');
                
            } else if (passwordMatched == true) {
                ssn.firstName = data.fname;
                ssn.userEmail = data.email;
                if(!data.lc){
                    ssn.localettiCredit = 0;
                  } else {
                      ssn.localettiCredit = data.lc;
                  }
                console.log("data existing and password matched");
                console.log(ssn.firstName);
                res.redirect("profile");
            }
            db.close();
        });
    });


});

module.exports = router;