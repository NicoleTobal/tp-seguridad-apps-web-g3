var mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
    email: String
}));

module.exports = User
