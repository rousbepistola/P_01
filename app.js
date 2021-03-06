var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_TEST_SK);
require('dotenv').config();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup');
var profileRouter = require('./routes/profile');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var forgotpassRouter = require('./routes/forgotpass');
var generatepassRouter = require('./routes/generatepass');
var accountRouter = require('./routes/account');
var chargeRouter = require('./routes/charge');
var touristRouter = require('./routes/localettiCredits/tourist');
var localRouter = require('./routes/localettiCredits/local');
var jetsetterRouter = require('./routes/localettiCredits/jetsetter');
var reduceLcRouter = require('./routes/localettiCredits/reduceLc');
var mailerRouter = require('./routes/mailer');
var contactusRouter = require('./routes/contactus');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'anything'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/forgotpass', forgotpassRouter);
app.use('/generatepass', generatepassRouter);
app.use('/account', accountRouter);
app.use('/charge', chargeRouter);
app.use('/tourist', touristRouter);
app.use('/local', localRouter);
app.use('/jetsetter', jetsetterRouter);
app.use('/reduceLc', reduceLcRouter);
app.use('/mailer', mailerRouter);
app.use('/contactus', contactusRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
