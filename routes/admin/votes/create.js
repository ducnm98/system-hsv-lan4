var mongoose = require('mongoose');
var { redirectToLogin, errorProcess } = require('../../../services/returnToUsers');
var { } = require('../../../services/socket');

module.exports = router => {
  router.post('/create', (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose.model('votes').create(req.body, (err, result) => {
        if (err) return errorProcess(res, err);
        if (result) {
          return res.redirect('/admin/votes')
        } else {
          return res.redirect('/admin/votes')
        }
      })
    } else {
      return redirectToLogin(res);
    }
  })
}