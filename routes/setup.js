var mongoose = require("mongoose");
var _ = require("lodash");
var bcrypt = require("bcryptjs");
var constants = require('./constants');

module.exports = app => {
  app.get("/setup", (req, res) => {
    bcrypt.hash("123", 10, (err, passHash) => {
      let users = {
        IdNumber: '16520241',
        email: '16520241@gm.uit.edu.vn',
        password: passHash,
        birthDate: new Date(),
        fullName: 'Nguyễn Minh Đức',
        numberPhone: '0932680505',
        class: 'HTCL2016',
        faculty: 'HTTT',
        nation: 'Kinh',
        religion: '',
        dateInYouthUnion: new Date(),
        dateInStudentAssociation: new Date(),
        typeOfDelegate: true,
        imageLink: '',
        roles: constants.IS_STAFF,
      };
      mongoose.model("delegates").create(users, (err, result) => {
        if (result) {
          res.send(result);
        }
      });
    });
  });
};
