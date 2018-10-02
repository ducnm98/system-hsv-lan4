var mongoose = require('mongoose');
var config = require('../config');
var qrCode = require('qrcode');

module.exports = {
  createAndSaveQrCode: (userInfo) => {
    return new Promise((resolve, reject) => {
      let userId = userInfo._id;
      let storePlace = `qrCode/${userInfo.IdNumber}_${userId}.png`;
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