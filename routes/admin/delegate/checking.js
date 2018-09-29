var { redirectToLogin, success, successWithNoData, errorProcess, errorWithMess } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');
var { } = require('../../../services/socket');

module.exports = router => {
  router.get("/checking", (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose.model('attendance').find().exec((err, result) => {
        if (err) throw err;
        if (result) {
          return res.render("admin/delegates/checking", {
            sessionList: result
          });
        } else {
          return errorWithMess(res, "Not done");
        }
      })
    } else {
      return redirectToLogin(res);
    }
  });

  router.put("/checking/:session/:id", (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose.model('delegates').findOne({ _id: req.params.id }, (err, userInfo) => {
        if (err) return errorProcess(res, err);
        if (userInfo) {
          let update = {

          }
        } else {
          return errorWithMess(res, "Not found delegates")
        }
      })
    } else {
      return redirectToLogin(res)
    }
  });
};
