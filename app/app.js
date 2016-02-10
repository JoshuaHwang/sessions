var express       = require('express');
var path          = require('path');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var passportLocal = require('passport-local');
var session       = require('express-session');
var mongoose      = require('mongoose');

var app = express();

var db = mongoose.connect('mongodb://users:occs@ds059375.mongolab.com:59375/users/', function(err) {
  if(err) throw err;
  console.log('Connected to users database!');
});

app.use(bodyParser.json());
app.use('/', require('./db.js'));

var server = require('http').createServer(app);

var port = process.env.PORT || 3000;

app.listen(port);
console.log('3000 is the magic port!');