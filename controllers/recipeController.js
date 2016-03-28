// REQUIREMENTS
var express  = require('express'),
    router   = express.Router();

var Recipe    = require('../models/recipes')

// INDEX
router.get('/', function(req, res){
  User.find(function(err, users){
    res.send(users)
  })
})

// EXPORT
module.exports = router;
