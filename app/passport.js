var express        = require('express');
var app            = express();
var router         = express.Router();
var path           = require('path');
var bodyParser     = require('body-parser');
var passport       = require('passport');
var passportLocal  = require('passport-local');
var session        = require('express-session');
var mongoose       = require('mongoose');

var urlParser     = bodyParser.urlencoded({ extended: true });
var LocalStrategy = passportLocal.Strategy;

/* ----- LOGIN ----- */

var Schema     = mongoose.Schema;
var userSchema = new Schema({
  email:    { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

var Schema           = mongoose.Schema;
var submissionSchema = new Schema({
  image:       { type: String, required: true, unique: true },
  name:        { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  likes:       { type: Number, default: 0 },
  comments:    { type: Number, default: 0 },
  chats: [
    {
      author: { type: String },
      body:   { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
    }
  ]
});

mongoose.model('Submission', submissionSchema);
var Submission = mongoose.model('Submission');

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
  console.log(user.username);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    console.log(user.username);
    done(err, user);
  });
});

router.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));

var initializer = passport.initialize();

router.use(initializer);
router.use(passport.session());
router.use(express.static('/app/public'));
router.use('/public', express.static(path.join(__dirname, 'public')));

/* ----- ROUTES ----- */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../app/views/login.html'));
});

router.get('/users/submissions', function(req, res) {
  Submission.find({}, function(err, data) {
    if(err) throw err;
    res.send(data);
  });
});

router.post('/upload', urlParser, function(req, res) {
  var submission = new Submission({
    image:       req.body.image,
    name:        req.body.name,
    description: req.body.description
  });
  submission.save(function(err) {
    if(err) {
      console.log(err)
    } else {
      console.log('Session submitted!');
      res.redirect('/success');
    }
  });
});

router.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/register.html'));
});

router.post('/register', urlParser, function(req, res) {
  var user = new User({
    email:    req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if(err) {
      var err = 'Something bad happened, try again!';
      if(err.code === 11000) {
        var error = 'That email is already taken, try another.';
      }
      res.redirect('/register');
    } else {
      res.redirect('/');
    }
  });
});

router.post('/login', urlParser, passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure'
}));

router.get('/failure', function(req, res) {
  console.log('login failed');
  res.sendFile(path.join(__dirname + '/views/login.html'));
});

router.use('/success', function(req, res, next) {
  if(req.user) {
    next();
  }
  else {
    res.redirect('/');
  }
});

router.get('/success', function(req, res) {
  console.log('Login successful');
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.get('/logout', function(req, res) {
  console.log('User has logged out');
  req.logout();
  res.redirect('/');
});

module.exports = router;