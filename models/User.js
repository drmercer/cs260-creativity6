const mongoose = require('./db');

module.exports = mongoose.model('User', new mongoose.Schema({
	username: { type: String, unique: true },
	email: String,
	hashed_password: String,
}));
