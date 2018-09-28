var schema = require('./schema');
var mongoose = require('mongoose');

module.exports = {
    users: mongoose.model('users', schema.users),
    delegates: mongoose.model('delegates', schema.delegates),
    attendance: mongoose.model('attendance', schema.attendance),
}