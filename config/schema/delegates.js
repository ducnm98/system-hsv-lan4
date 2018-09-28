var mongoose = require('mongoose');

var delegates = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    birthDate: { type: Date },
    fullName: { type: String },
    numberPhone: { type: String },
    class: { type: String },
    faculty: { type: String },
    nation: { type: String },
    religion: { type: String },
    dateInYouthUnion: { type: Date },
    dateInStudentAssociation: { type: Date },
    typeOfDelegate: { type: Boolean },
})

module.exports = delegates;