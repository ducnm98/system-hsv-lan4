var { redirectToLogin, errorWithMess, success, errorProcess } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');

module.exports = router => {
  router.get("/get-code", (req, res, next) => {
    if (req.isAuthenticated()) {
      res.render("admin/delegates/getCode");
    } else {
      return redirectToLogin(res);
    }
  });

  router.get('/get-code/:IdNumber', (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose.model('delegates').findOne({ IdNumber: req.params.IdNumber }, (err, result) => {
        if (err) return errorProcess(res, err);
        if (result) {
          return success(res, "Done", result);
        } else {
          return errorWithMess(res, "Not found delegates")
        }
      })
    } else {
      return errorWithMess(res, "You are not login")
    }
  })
};
