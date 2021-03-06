var mongoose = require("mongoose");

var attendance = new mongoose.Schema({
  name: { type: String },
  delegates: [
    {
      delegateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "delegates"
      },
      IdNumber: { 
        type: String
      },
      delegateName: {
        type: String
      },
      gender: {
        type: Boolean
      },
      religion: { type: String },
      nation: { type: String },
      birthDate: { type: Date },
      numberOfYear: { type: String },
      politic: { type: String },
      isALeaderYouth: { type: Boolean },
      isALeaderAssociation: { type: Boolean },
      isYouth: { type: Boolean },
      partyMembers: { type: Boolean },
      typeOfDelegate: { type: String },
      createdTime: {
        type: Date,
        default: new Date()
      },
      _id: false
    },
  ]
});

module.exports = attendance;
