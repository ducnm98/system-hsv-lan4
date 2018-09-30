var mongoose = require("mongoose");

var attendance = new mongoose.Schema({
  name: { type: String },
  delegates: [
    {
      delegateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "delegates"
      },
      delegateName: {
        type: String
      },
      gender: {
        type: Boolean
      },
      createdTime: {
        type: Date,
        default: new Date()
      },
      _id: false
    },
  ]
});

module.exports = attendance;
