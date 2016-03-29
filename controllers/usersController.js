// REQUIREMENTS
var express  = require('express'),
    passport = require('passport'),
    router   = express.Router();

// MODELS
var User = require('../models/users')

// INDEX
router.get('/', function(req, res){
  User.find(function(err, users){
    res.send(users)
  });
});

// LOGOUT
router.get('/logout',function(req,res){
      req.logout();
      res.redirect('/');
});

// SIGN-UP
router.post('/register', passport.authenticate('local-signup', {
	failureRedirect: '/' }), function(req, res) {
    res.send(req.user);
});

// LOGIN
router.post('/login',passport.authenticate('local-login',{
  failureRedirect: '/',}), isLoggedIn, function(req,res){
      console.log(req.user);
      res.send(req.user);
});

// LOGIN STATUS
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
  	return next();
  } else {
  	res.redirect('/');
  };
};

// EXPORT
module.exports = router;
