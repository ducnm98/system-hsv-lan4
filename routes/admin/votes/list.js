var mongoose = require('mongoose');
var { redirectToLogin, errorWithMess } = require('../../../services/returnToUsers');
var { } = require('../../../services/socket');
var { checkPermission } = require('../../../services/checkPermission');
var { IS_STAFF } = require("../../constants");

module.exports = router => {
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      if(checkPermission(req.user.roles, IS_STAFF)) {
        mongoose.model('votes').find().exec((err, result) => {
          if (err) throw err;
          if (result) {
            mongoose.model('attendance').find().exec((err, attendances) => {
              if (err) throw err;
              if (attendances) {
                return res.render('admin/vote', { votesList: result, sessionList: attendances, roles: req.user.roles })
              }
            })
          } else {
            return errorWithMess(res, "Hmmmm")
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
