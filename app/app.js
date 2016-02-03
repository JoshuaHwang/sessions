var express       = require('express');
var path          = require('path');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var passportLocal = require('passport-local');
var session       = require('express-session');
var mongoose      = require('mongoose');

var app = express();

var db = mongoose.connect('mongodb://localhost/users/', function(err) {
  if(err) throw err;
  console.log('Connected to users database!');
});

app.use(bodyParser.json());
app.use('/', require('./passport.js'));

app.use(function(req, res, next) {
  req.db = db;
  next();
});

var server = require('http').createServer(app);

server.listen(3000);
console.log('3000 is the magic port!');