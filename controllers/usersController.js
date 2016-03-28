// REQUIREMENTS
var express  = require('express'),
    router   = express.Router();

// MODELS
var User    = require('../models/users')

// INDEX
router.get('/', function(req, res){
  User.find(function(err, users){
    res.send(users)
  })
})

// EXPORT
module.exports = router;
