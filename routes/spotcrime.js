
var express = require('express');
var router = express.Router();
var ssn;
const spotcrime = require('spotcrime');


router.post('/', function(req, res, next) {
  ssn = req.session;

  
  
 
    // somewhere near phoenix, az
    const loc = {
    lat: req.body.lat,
    lon: req.body.lng
    };
    
    const radius = 0.01; // this is miles
    
    // // using callbacks
    // spotcrime.getCrimes(loc, radius, function(err, crimes){
    //     ssn.crimesSpotCrimes = crimes;
    //     console.log("This is inside spotcrime router", ssn.crimesSpotCrimes[2]);
    // });
    
    spotcrime.getCrimes(loc, radius).then((crimes) => {
        ssn.crimesSpotCrimes = crimes;
        // console.log("This is inside spotcrime router", ssn.crimesSpotCrimes);
    });
    

    setTimeout(function(){
        res.status(200).send({crimespot: ssn.crimesSpotCrimes, crimetry:"OK na please"});
    }, 500)
    
    
  });

module.exports = router;