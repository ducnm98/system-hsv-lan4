var mongoose = require('mongoose');
var { checkPermission } = require('../../../services/checkPermission')
var { redirectToLogin, success, errorWithMess, errorProcess } = require('../../../services/returnToUsers');
var { IS_STAFF } = require("../../constants");

module.exports = router => {
  router.get('/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
      if (checkPermission(req.user.roles, IS_STAFF)) {
        mongoose.model('delegates').findOne({ _id: req.params.id }, (err, result) => {
          if (err) return errorProcess(res, err);
          if (result) {
            result.password = null;
            return success(res, "Done", result)
          } else {
            return errorWithMess(res, "Not found")
          }
        })
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res);
    }
  })

  router.post('/edit', (req, res, next) => {
    if (req.isAuthenticated()) {
      if (checkPermission(req.user.roles, IS_STAFF)) {
        mongoose.model('delegates').findOneAndUpdate({ _id: req.body.id }, { ...req.body }, { new: true }, (err, result) => {
          if (err) return errorProcess(res, err);
          if (result) {
            return success(res, "Done", result)
          } else {
            return errorWithMess(res, "Not found")
          }
        })
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res);
    }
  })
}