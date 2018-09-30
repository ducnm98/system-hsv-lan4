var router = require('express').Router();
var { redirectToLogin } = require('../../../services/returnToUsers');

router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.render("admin", { roles: req.user.roles });
  } else {
    return redirectToLogin(res)
  }
});

require('./login')(router);

module.exports = router;
