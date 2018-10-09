var mongoose = require("mongoose");

var votes = new mongoose.Schema({
  question: { type: String },
  numberDelegatesOfSession: { type: Number },
  withSession: {
    type: Boolean,
    default: false
  },
  delegatesJoined: [
    {
      delegatesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "delegates"
      },
      delegateName: {
        type: String
      },
      _id: false
    }
  ],
  approve: [
    {
      delegatesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "delegates"
      },
      delegateName: {
        type: String
      },
      _id: false
    }
  ],
  disApprove: [
    {
      delegatesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "delegates"
      },
      delegateName: {
        type: String
      },
      _id: false
    }
  ]
});

module.exports = votes;
