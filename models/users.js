// REQUIREMENTS
var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs')

// SCHEMA
var userSchema = mongoose.Schema({
	email: String,
	password: String,
	favorites: []
});

// PASSPORT
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// EXPORT
module.exports = mongoose.model("User", userSchema);
