var schema = require('./schema');
var mongoose = require('mongoose');

module.exports = {
    delegates: mongoose.model('delegates', schema.delegates),
    attendance: mongoose.model('attendance', schema.attendance),
}