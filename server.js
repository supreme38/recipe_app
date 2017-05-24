// REQUIREMENTS
var express           = require('express'),
    mongoose          = require('mongoose'),
    bodyParser        = require('body-parser'),
    methodOverride    = require('method-override'),
    passport          = require('passport'),
    session           = require('express-session'),
    app               = express(),
    port              = process.env.PORT || 3000;

require('./config/passport')(passport);
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/Yummy';
mongoose.connect(mongoUri);

// MIDDELWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({ name: 'recipe_app2', secret: 'recipe' }));
app.use(passport.initialize());
app.use(passport.session());

var usersController = require('./controllers/usersController');
app.use('/users', usersController);

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

// CONNECT & LISTEN
mongoose.connection.once('open', function() {
  app.listen(port, function() {
      console.log('LISTEN TO ME ON PORT ' + port);
  });
});
