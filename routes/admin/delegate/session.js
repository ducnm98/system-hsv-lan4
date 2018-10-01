var { redirectToLogin, errorProcess, success, errorWithMess, successWithNoData } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');
var { checkPermission } = require('../../../services/checkPermission');
var { IS_STAFF } = require("../../constants");

module.exports = router => {
  router.get("/session", (req, res, next) => {
    if (req.isAuthenticated()) {
      if (checkPermission(req.user.roles, IS_STAFF)) {
        mongoose.model('attendance').find().exec((err, result) => {
          if (err) throw err;
          if (result) {
              res.render("admin/delegates/session", {
                sessionList: result,
                roles: req.user.roles
              });
          }
        })
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res);
    }
  });

  router.post('/session', (req, res, next) => {
    if (req.isAuthenticated()) {
      if (checkPermission(req.user.roles, IS_STAFF)) {
        let insert = {
          name: req.body.name
        }
        mongoose.model('attendance').create(insert, (err, result) => {
          if (err) throw err;
          if (result) {
            return res.redirect('/admin/delegates/session');
          } else {
            return res.redirect('/admin/delegates/session');
          }
        })
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res)
    }
  });

  router.delete('/session/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
      if (checkPermission(req.user.roles, IS_STAFF)) {
        mongoose.model('attendance').findOneAndDelete({ _id: req.params.id }, (err, result) => {
          if (err) return errorProcess(res, err);
          if (result) {
            return successWithNoData(res, "Done");
          } else {
            return errorWithMess(res, "Not done")
          }
        })
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res)
    }
  })
};
