var { StoreFile } = require("../../../services/uploadFile");
var { redirectToLogin } = require("../../../services/returnToUsers");
var readXlsxFile = require("read-excel-file/node");
var fs = require("fs");

module.exports = router => {
  router.post("/create", StoreFile('documents').any, (req, res, next) => {
    if (req.isAuthenticated()) {
      req.files[0].link = req.files[0].destination + req.files[0].filename;
  
      const schema = {
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
        if (rows.length > 0) {
          rows.map((item, index) => {
            mongoose.model('delegates').create(item, (err, result) => {
              if (err) return returnToUser.errorProcess(res, err);
              if (result)
                console.log(result)
            })
          })
          return returnToUser.success(res, "Done", rows)
        }
      })
    } else {
      return redirectToLogin(res)
    }

  });
};
