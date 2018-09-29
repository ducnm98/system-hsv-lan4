var mongoose = require('mongoose');
var { TYPE_OF_USERS } = require('../../routes/constants');
var delegates = new mongoose.Schema({
    IdNumber: { type: String },
    email: { type: String },
    password: { type: String },
    birthDate: { type: Date },
    fullName: { type: String },
    gender: { type: Boolean },
    numberPhone: { type: String },
    class: { type: String },
    faculty: { type: String },
    nation: { type: String },
    religion: { type: String },
    dateInYouthUnion: { type: Date },
    dateInStudentAssociation: { type: Date },
    typeOfDelegate: { type: Boolean },
    imageLink: { type: String },
    roles: [{ type: String, enum: TYPE_OF_USERS }]
})

module.exports = delegates;