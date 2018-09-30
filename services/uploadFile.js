var multer = require('multer');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var randomString = require('randomstring');

module.exports = {
  StoreFile: (type) => {
    let placeStore = `${type}/`;
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/' + placeStore)
      },
      filename: (req, file, cb) => {
        let fileName = file.originalname.split('.');
        let name = `${randomString.generate(10)}-${new Date().getTime()}.${fileName[1]}`
        cb(null, name);
      }
  });
    return multer({storage: storage});
  },

  updateUser: (user, fileId, cb) => {
    let update = {
      postedBy: user._id,
      districtsID: user.districtsID != '' ? user.districtsID : null,
      wardsID: user.wardsID != '' ? user.wardsID : null,
    }
    mongoose.model('objectUpload').findByIdAndUpdate(fileId, update, {new: false}, (err, exculte) => {
      if (err) throw err;
      if (exculte) {
        return cb(true);
      }
      return cb(false);
    })
  },

  removeFile: (fileId) => {
    mongoose.model('objectUpload').findByIdAndRemove(fileId, (err, exculte) => {
      if (err) throw err;
      if (exculte) {
        const linkImage = `public${exculte.link}`
        fs.exists(linkImage, (exists) => {
          if (exists) {
            fs.unlink(linkImage, err => { if(err) throw err });
            return true;
          } else return false;
        })
      }
    })
  }
}