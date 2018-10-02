var mongoose = require("mongoose");
var _ = require("lodash");
var bcrypt = require("bcryptjs");
var constants = require('./constants');

module.exports = app => {
  app.get("/setup", (req, res) => {
    bcrypt.hash("lapTrinhWeb123", 10, (err, passHash) => {
      let users = {
        IdNumber: 'admin_system',
        email: 'laptrinhweb@gmail.com',
        password: passHash,
        birthDate: new Date(),
        fullName: 'Quản trị viên',
        gender: 1,
        numberPhone: '0932680505',
        class: '',
        faculty: '',
        nation: '',
        religion: '',
        dateInYouthUnion: new Date(),
        dateInStudentAssociation: new Date(),
        typeOfDelegate: 'ĐẠI BIỂU DỰ KHUYẾT',
        imageLink: '',
        roles: constants.IS_STAFF,
      };
      mongoose.model("delegates").create(users, (err, admin_system) => {
        if (admin_system) {
          bcrypt.hash("checkingStaff123", 10, (err, passHash) => {
            let users = {
              IdNumber: 'diemdanh_hsv',
              email: 'diemdanh_hsv@gmail.com',
              password: passHash,
              birthDate: new Date(),
              fullName: 'Lễ Tân Điểm danh',
              gender: 1,
              numberPhone: '0932680505',
              class: '',
              faculty: '',
              nation: '',
              religion: '',
              dateInYouthUnion: new Date(),
              dateInStudentAssociation: new Date(),
              typeOfDelegate: 'ĐẠI BIỂU DỰ KHUYẾT',
              imageLink: '',
              roles: constants.IS_CHECKING,
            };
            mongoose.model("delegates").create(users, (err, diemdanh_hsv) => {
              if (diemdanh_hsv) {
                bcrypt.hash("checkingStaff123", 10, (err, passHash) => {
                  let users = {
                    IdNumber: 'diemdanh_hsv_1',
                    email: 'diemdanh_hsv_1@gmail.com',
                    password: passHash,
                    birthDate: new Date(),
                    fullName: 'Lễ Tân Điểm danh',
                    gender: 1,
                    numberPhone: '0932680505',
                    class: '',
                    faculty: '',
                    nation: '',
                    religion: '',
                    dateInYouthUnion: new Date(),
                    dateInStudentAssociation: new Date(),
                    typeOfDelegate: 'ĐẠI BIỂU DỰ KHUYẾT',
                    imageLink: '',
                    roles: constants.IS_CHECKING,
                  };
                  mongoose.model("delegates").create(users, (err, diemdanh_hsv_1) => {
                    if (diemdanh_hsv_1) {
                      res.send(admin_system, diemdanh_hsv, diemdanh_hsv_1);
                    }
                  });
                });
              }
            });
          });
        }
      });
    });
  });
};
