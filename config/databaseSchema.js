var schema = require('./schema');
var mongoose = require('mongoose');

module.exports = {
    delegates: mongoose.model('delegates', schema.delegates),
    attendance: mongoose.model('attendance', schema.attendance),
    votes: mongoose.model('votes', schema.votes),
    time: mongoose.model('times', schema.time)
}