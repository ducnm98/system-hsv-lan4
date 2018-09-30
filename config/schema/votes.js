var mongoose = require("mongoose");

var votes = new mongoose.Schema({
  question: { type: String },
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
    },
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
  ],
});

module.exports = votes;
