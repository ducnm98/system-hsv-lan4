var mongoose = require('mongoose');
var { redirectToLogin, errorProcess, success, errorWithMess } = require('../../../services/returnToUsers');
var { } = require('../../../services/socket');
var { checkPermission } = require('../../../services/checkPermission');
var { IS_STAFF } = require("../../constants");

module.exports = router => {
  router.delete('/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
      if(checkPermission(req.user.roles, IS_STAFF)) {
        mongoose.model('votes').findOneAndDelete({ _id: req.params.id }, (err, result) => {
          if (err) return errorProcess(res, err);
          if (result) {
            return success(res, "Done", true)
          } else {
            return errorWithMess(res, "Not found")
          }
        })
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res)
    }
  })
}