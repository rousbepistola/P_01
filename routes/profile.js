var express = require('express');
var router = express.Router();
var ssn;
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://rousbepistola:3te5hrlns2gy@cluster0-1lsui.azure.mongodb.net/test?retryWrites=true&w=majority";


/* GET home page. */
router.get('/', function(req, res, next) {
  ssn=req.session;
  if(ssn.firstName){
    ssn.loginfirst = "";
    res.render('profile', {
      name: ssn.firstName, 
      mail: ssn.userEmail
    });
  } else {
    ssn.loginfirst = "Please Login/Signup";
    res.redirect('/')
  }
  
});



router.post('/', function(req, res, next){
  console.log("inside post method profile")
  ssn=req.session;
  ssn.firstName = req.body.fname;
  ssn.lastName = req.body.lname;
  ssn.userEmail = req.body.email;
  ssn.userPass = req.body.pass;

  MongoClient.connect(url, function(err, db){
    if(err) throw err;
    let dbo = db.db("projectOne");
    let myInfoLog = {email:ssn.userEmail, pass:ssn.userPass};
    
                  // TRYING TO COUNTERCHECK IF A USER ALREADY EXISTS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  //   dbo.collection("userInfo").findOne(myInfoLog, function(err, data){
  //     if(data.email){
  //         ssn.signUpError = "User email already exists";
  //         console.log("data returns an active email");
  //         db.close();
  //         res.redirect('/');
  //     } else {
  //       let myInfo = {fname:ssn.firstName, lname:ssn.lastName, email:ssn.userEmail, pass:ssn.userPass};
  //       dbo.collection("userInfo").insertOne(myInfo, function(err, data){
  //         if(err) throw err;
  //         console.log("collection inserted");
  //         db.close();
  //       });
  //       res.redirect('/profile');
  //     }
  // });


  let myInfo = {fname:ssn.firstName, lname:ssn.lastName, email:ssn.userEmail, pass:ssn.userPass};
        dbo.collection("userInfo").insertOne(myInfo, function(err, data){
          if(err) throw err;
          console.log("collection inserted");
          // console.log(data.ops[0].fname);
          // console.log(data.ops[0].lname);
          // console.log(data.ops[0].email);
          // console.log(data.ops[0].pass);

          ssn.firstName = data.ops[0].fname;
          ssn.lastName = data.ops[0].lname;
          ssn.userEmail = data.ops[0].email;
          ssn.userPass = data.ops[0].pass;
          console.log("welcome! " + ssn.firstName + " " + ssn.lastName)

          db.close();
        });

        res.redirect('/profile');

  });

});

module.exports = router;
