var mongoose = require('mongoose');

var users = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    fullName: { type: String },
})

module.exports = users;