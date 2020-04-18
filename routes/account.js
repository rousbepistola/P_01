var express = require('express');
var router = express.Router();
var ssn;
const stripe = require('stripe')(process.env.STRIPE_TEST_SK);
const bodyParser = require('body-parser');


//variable reqs
let MongoClient = require('mongodb').MongoClient;
let url = process.env.MONGO_URL;
const bcrypt = require('bcrypt');


/* GET home page. */
// STRIPE CODE




router.get('/', function(req, res, next) {
    ssn = req.session;

    if(!ssn.localettiCredit){
      ssn.localettiCredit = 0;
    }

    res.render('account', {
      name: ssn.firstName, 
      mail: ssn.userEmail,
      lc:ssn.localettiCredit
    });

});

router.post('/', function(req, res, next) {
  ssn = req.session;

  // This creates a new Customer and attaches the PaymentMethod in one API call.
  const customer = stripe.customers.create({
    payment_method: intent.payment_method,
    email: ssn.userEmail,
    invoice_settings: {
      default_payment_method: intent.payment_method,
    },
  });


  


  //After creating the customer, store the id value in your own database so you can use it later. The next step also requires this ID.
  //CREATE SUBSCRIPTION https://stripe.com/docs/billing/subscriptions/set-up-subscription#create-product-plan-code

  const subscription = stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: "plan_FSDjyHWis0QVwl" }],
    expand: ["latest_invoice.payment_intent"]
  });



  res.render('account', {
    name: ssn.firstName, 
    mail: ssn.userEmail
  });

});


module.exports = router;