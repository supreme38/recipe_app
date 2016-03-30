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

// ADDING TO FAVORITES
router.put("/fav/:id", function(req, res){
  User.findById(req.params.id, function(err, user){
    user.favorites.push(req.body);
    user.save(function(err, data){
      res.send(data)
    });
  });
});

// DELETING FROM FAVORITES
router.put("/deleteFav/:id", function(req, res){
  User.findById(req.params.id, function(err, user){
    user.favorites.forEach(function(x){
      if(x.id == req.body.id){
      var num = user.favorites.indexOf(x);
      user.favorites.splice(num, 1);
      }
    });
    user.save(function(err, data){
      res.send(data)
    });
  });
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
