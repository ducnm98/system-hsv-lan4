var { redirectToLogin, errorProcess, success, errorWithMess, successWithNoData } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');

module.exports = router => {
  router.get("/session", (req, res, next) => {
    if (req.isAuthenticated()) {
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
      return redirectToLogin(res);
    }
  });

  router.post('/session', (req, res, next) => {
    if (req.isAuthenticated()) {
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
      return redirectToLogin(res)
    }
  });

  router.delete('/session/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose.model('attendance').findOneAndDelete({ _id: req.params.id }, (err, result) => {
        if (err) return errorProcess(res, err);
        if (result) {
          return successWithNoData(res, "Done");
        } else {
          return errorWithMess(res, "Not done")
        }
      })
    } else {
      return redirectToLogin(res)
    }
  })
};
