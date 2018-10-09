var { redirectToLogin, success, successWithNoData, errorProcess, errorWithMess } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');
var { StoreFile } = require("../../../services/uploadFile");
var { domain } = require('../../../config')
var readXlsxFile = require("read-excel-file/node");
var fs = require("fs");

module.exports = router => {
  router.post("/update-type", StoreFile('delegates').any(), (req, res, next) => {
    if (req.isAuthenticated()) {
      req.files[0].link = req.files[0].destination + req.files[0].filename;
      const schema = {
        'IdNumber': {
          prop: 'IdNumber',
          type: String,
          require: true
        },
        'Doan': {
          prop: 'isALeaderYouth',
          type: Boolean,
          parse(value) {
            if (value == "X") {
              return true
            } else {
              return false;
            }
          } 
        },
        'Hoi': {
          prop: 'isALeaderAssociation',
          type: Boolean,
          parse(value) {
            if (value == "X") {
              return true
            } else {
              return false;
            }
          }
        },
        'Dang': {
          prop: 'partyMembers',
          type: Boolean,
          parse(value) {
            if (value == "X") {
              return true
            } else {
              return false;
            }
          }
        },
        'type': {
          prop: 'numberOfYear',
          type: String,
        },
        'politic': {
          prop: 'politic',
          type: String,
        }
      };

      readXlsxFile(fs.createReadStream(req.files[0].link), { schema }).then(({rows, err}) => {
        if (err) return returnToUser.errorProcess(res, err);
        if (rows.length > 0) {
          rows.map(async (item, index) => {
            let query = {
              IdNumber: item.IdNumber,
            }
            let update = {
              ...item
            }
            let option = {
              new: true
            }
            await mongoose.model('delegates').findOneAndUpdate(query, update, option, async (err, result) => {
              if (err) console.log(err);
              if (result) {
                if (rows.length - index == 1) {
                  return success(res, "Done", rows)
                }
              }
            })
          })
        }
      })
    } else {
      return redirectToLogin(res);
    }
  })
}