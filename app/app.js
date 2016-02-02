var express       = require('express');
var path          = require('path');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var passportLocal = require('passport-local');
var session       = require('express-session');
var mongoose      = require('mongoose');
var multer        = require('multer');

var app = express();

app.use(bodyParser());
app.use('/', require('./passport.js'));

app.get('/users', function(req, res) {
  res.send('Submissions API');
});

/*var upload = multer({ dest: './uploads/' });

app.post('/upload', multer({ dest: './uploads/' }).single('image'), function(req,res){
  console.log(req.body);
  console.log(req.file);
  
  res.status(204).end();
});*/

var server = require('http').createServer(app);

server.listen(3000);
console.log('3000 is the magic port!');