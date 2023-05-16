// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 2024;
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
var ObjectId = require('mongodb').ObjectID
var parts = require("./public/constants.js"); // destruct find out how to make this work
var db

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db, ObjectId);
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'))
app.use(express.static('public'))


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2021b', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
console.log(parts.tiresToUse)//struct


// may switch to an api that uses locations instead and health

const trackInfo = {
  '': {
      'frontTire': '120/70',
      'rearTire': '190/55',
      'cc': '1000cc',
      'oil': '10W-40',
      'oilFilter': '303c',
      'power': '197hp'
  },
  'kawasaki zx6r':{
      'frontTire': '120/70',
      'rearTire': '180/55',
      'cc': '636cc',
      'oil': '10W-40',
      'oilFilter': '303c',
      'power': '127hp'
  },
  'kawasaki zx4r':{
      'frontTire': '120/70',
      'rearTire': '160/60',
      'cc': '399cc',
      'oil': '15W-50',
      'oilFilter': 'unknown',
      'power': 'unknown'
  },
  'bmw s1000rr':{
      'frontTire': '120/70',
      'rearTire': '190/55',
      'cc': '999cc',
      'oil': '5W-40',
      'oilFilter': '160',
      'power': '205hp'
  },
  'ducati streetfighter v2':{
      'frontTire': '120/70',
      'rearTire': '160/60',
      'cc': '955cc',
      'oil': '15W-50',
      'oilFilter': '159', 
      'power': '153hp'
  },
  'ducati streetfighter v4':{
      'frontTire': '120/70',
      'rearTire': '160/60',
      'cc': '1103cc',
      'oil': '15W-50',
      'oilFilter': '159',
      'power': '208hp'
  },
  'yamaha r1':{
      'frontTire': '120/70',
      'rearTire': '190/55',
      'cc': '998cc',
      'oil': '10W-40',
      'oilFilter': '159',
      'power': '198hp'
  },
  'unknown':{
      'frontTire': 'unknown',
      'rearTire': 'unknown',
      'cc': 'unknown' 
  }
}