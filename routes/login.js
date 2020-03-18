var express = require('express');
var router = express.Router();
var ssn;
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://rousbepistola:3te5hrlns2gy@cluster0-1lsui.azure.mongodb.net/test?retryWrites=true&w=majority";


router.post('/', function(req, res, next){
    console.log("enters login processor");

    ssn = req.session;

    var logemail = req.body.email;
    var logpass = req.body.pass;


    MongoClient.connect(url, function(err, db){
        if(err) throw err;

        let dbo = db.db("projectOne");
        let myinfo = {email:logemail, pass:logpass};

        dbo.collection("userInfo").findOne(myinfo, function(err, data){
            if(data == null){
                ssn.loginError = "User credentials does not exist";
                ssn.errorNumber = 3;
                console.log("data null");
                res.redirect('/');
                
            } else {
                ssn.firstName = data.fname;
                ssn.userEmail = data.email;
                console.log("data here");
                console.log(data);
                res.redirect("profile");
            }
            db.close();
        });
    });


});

module.exports = router;