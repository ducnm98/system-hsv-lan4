var mongoose = require('mongoose');
var config = require('../config/index');
var qrCode = require('qrcode');

module.exports = {
  CreateAndSave: (type, directTo, cb) => {
    let insert = {
      type: type,
      directTo: directTo,
    }
    mongoose.model('qrCode').create(insert, (err, data) => {
      if (err) throw err;
      let imageLink = `/images/qrcodes/${type}/${data._id}.png`;
      let storePlace = `public/img/qrcodes/${type}/${data._id}.png`;
      let linkDirect = `/qrdirect/${data._id}`;
      qrCode.toFile(storePlace, linkDirect, (err) => {
        if (err) cb(err);
        cb(null, imageLink);
      })
    })
  }
};