var mongoose = require('mongoose');
var config = require('../config');
var qrCode = require('qrcode');

module.exports = {
  createAndSaveQrCode: (userId) => {
    return new Promise((resolve, reject) => {
      let storePlace = `qrCode/${userId}.png`;
      let storePlaceLocal = 'public/' + storePlace;
      qrCode.toFile(storePlaceLocal, `${userId}`, (err) => {
        if (err) reject(err);
        let update = {
          qrCode: config.domain + '/' + storePlace
        }
        mongoose.model('delegates').findOneAndUpdate({ _id: userId }, update, { new: true }, (err, result) => {
          if (err) reject(err);
          resolve(result);
        })
      })
    })
  }
};