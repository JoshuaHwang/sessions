var express       = require('express');
var path          = require('path');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var passportLocal = require('passport-local');
var session       = require('express-session');
var mongoose      = require('mongoose');

var app = express();

var urlParser     = bodyParser.urlencoded({ extended: false });
var LocalStrategy = passportLocal.Strategy;

/* ----- LOGIN ----- */
mongoose.connect('mongodb://localhost/users', function(err) {
  if (err) throw err;
  console.log('connected!');
});

var Schema     = mongoose.Schema;
var userSchema = new Schema({
  email:    { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

mongoose.model('User', userSchema);
var User = mongoose.model('User');

var strategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
});

passport.use(strategy);

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    console.log(user);
    done(err, user);
  });
});

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));

var initializer = passport.initialize();

app.use(initializer);
app.use(passport.session());
app.use(express.static('/app/public'));
app.use('/public', express.static(path.join(__dirname, 'public')));

/* ----- ROUTES ----- */
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/login', urlParser, passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure'
}));

app.get('/failure', function(req, res) {
  console.log('login failed');
  res.sendFile(path.join(__dirname + '/login.html'));
});

app.use('/success', function(req, res, next) {
  if (req.user) {
    next();
  }
  else {
    res.redirect('/');
  }
});

app.get('/success', function(req, res) {
  console.log('Login successful');
  res.sendFile(path.join(__dirname + '/index.html'));
});

var server = require('http').createServer(app);

server.listen(3000);
console.log('3000 is the magic port!');