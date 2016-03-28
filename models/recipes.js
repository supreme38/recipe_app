// REQUIREMENTS
var mongoose = require("mongoose");
var ingrSchema = require("./ingr").schema;

// SCHEMA
var recipeSchema = mongoose.Schema({
	recipe: [ingrSchema]
});

// EXPORT
module.exports = mongoose.model("Recipe", recipeSchema);
