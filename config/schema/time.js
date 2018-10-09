var mongoose = require('mongoose');

var time = new mongoose.Schema({
  open: {
    type: Date
  },
  close: {
    type: Date
  }
})

module.exports = time;