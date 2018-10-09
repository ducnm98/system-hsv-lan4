var { redirectToLogin, success, successWithNoData, errorProcess, errorWithMess } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');
var { checkPermission } = require('../../../services/checkPermission');
var { IS_STAFF } = require("../../constants");
var bcrypt = require("bcryptjs");

module.exports = router => {
  router.post('/change-password', (req, res, next) => {
    if (req.isAuthenticated()) {
      if(checkPermission(req.user.roles, IS_STAFF)) {
        console.log(req.body)
        bcrypt.hash(req.body.password, 10, (err, passHash) => {
          let update = {
            password: passHash
          };
          let option = {
            new: true
          }
          mongoose.model('delegates').findOneAndUpdate({ IdNumber: req.body.IdNumber }, update, option, (err, result) => {
            if (err) return errorProcess(res, err);
            if (result) {
              return success(res, "Done", result)
            } else {
              return errorWithMess(res, "Not found")
            }
          })
        })
      }
    } else {
      return redirectToLogin(res);
    }
  })
}