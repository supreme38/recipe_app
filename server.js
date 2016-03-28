// REQUIREMENTS
var express           = require('express'),
    mongoose          = require('mongoose'),
    bodyParser        = require('body-parser'),
    methodOverride    = require('method-override'),
    app               = express(),
    port              = process.env.PORT || 3000;

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/recpie_app2';
mongoose.connect(mongoUri);

// MIDDELWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// CONNECT & LISTEN
mongoose.connection.once('open', function() {
  app.listen(port, function() {
      console.log('LISTEN TO ME ON PORT ' + port);
  });
});
