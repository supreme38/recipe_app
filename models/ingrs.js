// REQUIREMENTS
var mongoose = require('mongoose');

// SCHEMA
var ingrSchema = mongoose.Schema({
  name: String
  ingredients: String
});

// EXPORT
module.exports = mongoose.model("Ingr", ingrSchema);
