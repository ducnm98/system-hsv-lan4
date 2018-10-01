var { redirectToLogin, errorWithMess, success, errorProcess } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');
var { checkPermission } = require('../../../services/checkPermission');
var { TYPE_OF_ADMIN } = require("../../constants");

module.exports = router => {
  router.get("/get-code", (req, res, next) => {
    if (req.isAuthenticated()) {
      if (checkPermission(req.user.roles, TYPE_OF_ADMIN)) {
        res.render("admin/delegates/getCode", { roles: req.user.roles });
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res);
    }
  });

  router.get('/get-code/:IdNumber', (req, res, next) => {
    if (req.isAuthenticated()) {
      if (checkPermission(req.user.roles, TYPE_OF_ADMIN)) {
        mongoose.model('delegates').findOne({ IdNumber: req.params.IdNumber }, (err, result) => {
          if (err) return errorProcess(res, err);
          if (result) {
            return success(res, "Done", result);
          } else {
            return errorWithMess(res, "Not found delegates")
          }
        })
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return errorWithMess(res, "You are not login")
    }
  })
};
