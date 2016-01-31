var express       = require('express');
var path          = require('path');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var passportLocal = require('passport-local');
var session       = require('express-session');
var mongoose      = require('mongoose');

var app = express();

app.use('/', require('./passport.js'));

var server = require('http').createServer(app);

server.listen(3000);
console.log('3000 is the magic port!');