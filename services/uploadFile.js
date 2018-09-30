var multer = require('multer');
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
}