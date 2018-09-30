var mongoose = require('mongoose');
var { redirectToLogin, errorProcess, success, errorWithMess } = require('../../../services/returnToUsers');
var { } = require('../../../services/socket');

module.exports = router => {
  router.delete('/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose.model('votes').findOneAndDelete({ _id: req.params.id }, (err, result) => {
        if (err) return errorProcess(res, err);
        if (result) {
          return success(res, "Done", true)
        } else {
          return errorWithMess(res, "Not found")
        }
      })
    } else {
      return redirectToLogin(res)
    }
  })
}