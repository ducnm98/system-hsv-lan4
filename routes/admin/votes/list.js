var mongoose = require('mongoose');
var { redirectToLogin, errorWithMess } = require('../../../services/returnToUsers');
var { } = require('../../../services/socket');

module.exports = router => {
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
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
      return redirectToLogin(res)
    }
  })
};
