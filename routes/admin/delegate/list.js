var { redirectToLogin } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');

module.exports = router => {
  router.get("/", (req, res, next) => {
    if (req.isAuthenticated()) {
      // mongoose.model('delegates')
    } else {
      return redirectToLogin(res)
    }
  });
};
