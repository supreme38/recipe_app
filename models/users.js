// REQUIREMENTS
var mongoose = require("mongoose");

// SCHEMA
var userSchema = mongoose.Schema({
	email: String,
	password: String,
	favorites: []
});

// EXPORT
module.exports = mongoose.model("User", userSchema);
