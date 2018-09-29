var router = require('express').Router();
var { redirectToLogin } = require('../../../services/returnToUsers');

router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.render("admin");
  } else {
    return redirectToLogin(res)
  }
});

require('./login')(router);

module.exports = router;
