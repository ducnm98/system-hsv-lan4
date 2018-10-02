var { StoreFile } = require("../../../services/uploadFile");
var { redirectToLogin, success } = require("../../../services/returnToUsers");
var readXlsxFile = require("read-excel-file/node");
var fs = require("fs");
var mongoose = require('mongoose');
var { createAndSaveBarCode } = require('../../../services/createBarCode');
var { createAndSaveQrCode } = require('../../../services/createQrCode');
var bcrypt = require("bcryptjs");
var randomString = require('randomstring');
var { IS_STAFF } = require("../../constants");
var { checkPermission } = require('../../../services/checkPermission');
var { createAndSend, Send } = require('../../../services/sendEmail');
var { domain } = require('../../../config')

module.exports = router => {
  router.post("/create-by-file", StoreFile('documents').any(), (req, res, next) => {
    if (req.isAuthenticated()) {
      if (checkPermission(req.user.roles, IS_STAFF)) {
        req.files[0].link = req.files[0].destination + req.files[0].filename;
    
        const schema = {
          'passwords': {
            prop: 'password',
            type: String,
          },
          'IdNumber': {
            prop: 'IdNumber',
            type: String,
            require: true
          },
          'email': {
            prop: 'email',
            type: String,
            require: true,
          },
          'birthDate': {
            prop: 'birthDate',
            type: Date,
          },
          'fullName': {
            prop: 'fullName',
            type: String,
          },
          'gender': {
            prop: 'gender',
            type: Boolean,
            parse(value) {
              if (value == '1') {
                return true;
              } else {
                return false;
              }
            }
          },
          'numberPhone': {
            prop: 'numberPhone',
            type: String,
          },
          'class': {
            prop: 'class',
            type: String,
          },
          'faculty': {
            prop: 'faculty',
            type: String,
          },
          'nation': {
            prop: 'nation',
            type: String,
          },
          'religion': {
            prop: 'religion',
            type: String,
          },
          'dateInYouthUnion': {
            prop: 'dateInYouthUnion',
            type: Date,
          },
          'dateInStudentAssociation': {
            prop: 'dateInStudentAssociation',
            type: Date,
          },
          'typeOfDelegate': {
            prop: 'typeOfDelegate',
            type: String,
          },
          'imageLink': {
            prop: 'imageLink',
            type: String,
          },
          'roles': {
            prop: 'roles',
            type: String,
          },
        };
        readXlsxFile(fs.createReadStream(req.files[0].link), { schema }).then(({rows, err}) => {
          if (err) return returnToUser.errorProcess(res, err);
          let temp = [];
          if (rows.length > 0) {
            rows.map(async (item, index) => {
              let pass = item.password;
              item.password = bcrypt.hashSync(`${item.password}`, 10);
              await mongoose.model('delegates').create(item, async (err, result) => {
                if (err) console.log(err);
                if (result) {
                  // await createAndSend(result, pass);
                  await createAndSaveBarCode(result);
                  await createAndSaveQrCode(result);
                }
              })
              if (rows.length - index == 1) {
                console.log(temp);
                return success(res, "Done", rows)
              }
            })
          }
        })
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res)
    }
  });

  router.post('/create', StoreFile('delegates').any(), (req, res, next) => {
    if (req.isAuthenticated()) {
      if (checkPermission(req.user.roles, IS_STAFF)) {
        req.files[0].link = req.files[0].destination.substring(6, req.files[0].destination.length) + req.files[0].filename;
        let password = 'thisIsAPassword';
        bcrypt.hash(password, 10, (err, passHash) => {
          let insert = {
            ...req.body,
            password: passHash,
            imageLink: req.files[0].link,
            roles: [req.body.roles]
          }
          mongoose.model('delegates').create(insert, async (err, result) => {
            if (err) throw err;
            if (result) {
              await createAndSend(result, password);
              await createAndSaveBarCode(result);
              await createAndSaveQrCode(result);
              return res.redirect('/admin/delegates')
            }
          })
        })
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res)
    }
  });

  router.get('/create/:IdNumber', (req, res, next) => {
    mongoose.model('delegates').findOne({ IdNumber: req.params.IdNumber}, (err, result) => {
      if (err) errorProcess(res, err);
      if (result) {
        return success(res, "User already exists", true)
      } else {
        return success(res, "You can create", false)
      }
    })
  })
};
