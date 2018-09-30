var bwipjs = require("bwip-js");
var fs = require('fs');
var mongoose = require('mongoose');
var config = require('../config');

module.exports = {
  createAndSaveBarCode: (text, userId, cb) => {
    return new Promise((resolve, reject) => {
      let storePlace = `barCode/${userId}.png`;
      let storePlaceLocal = 'public/' + storePlace;
      bwipjs.toBuffer(
        {
          bcid: "code128", // Barcode type
          text: `${text}`, // Text to encode
          scale: 3, // 3x scaling factor
          height: 10, // Bar height, in millimeters
          includetext: true, // Show human-readable text
          textxalign: "center" // Always good to set this
        },
        function(err, png) {
          if (err) reject(err);
          if (png) {
            let update = {
              barCode: config.domain + '/' + storePlace
            }
            mongoose.model('delegates').findOneAndUpdate({ _id: userId }, update, { new: true })
            fs.writeFile(storePlaceLocal, png, (err, result) => {
              if (err) reject(err);
              resolve(storePlace);
            });
          }
          // `png` is a Buffer
          // png.length           : PNG file length
          // png.readUInt32BE(16) : PNG image width
          // png.readUInt32BE(20) : PNG image height
        }
      );
    })
  }
};
