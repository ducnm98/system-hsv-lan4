var mongoose = require('mongoose');
var { redirectToLogin, errorProcess } = require('../../../services/returnToUsers');
var { } = require('../../../services/socket');
var { checkPermission } = require('../../../services/checkPermission');
var { IS_STAFF } = require("../../constants");

module.exports = router => {
  router.post('/create', (req, res, next) => {
    if (req.isAuthenticated()) {
      if(checkPermission(req.user.roles, IS_STAFF)) {
        mongoose.model('votes').create(req.body, (err, result) => {
          if (err) return errorProcess(res, err);
          if (result) {
            return res.redirect('/admin/votes')
          } else {
            return res.redirect('/admin/votes')
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