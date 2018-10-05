var router = require("express").Router();
var { redirectToLogin } = require("../../../services/returnToUsers");
var { TYPE_OF_ADMIN } = require("../../constants");
var { checkPermission } = require('../../../services/checkPermission');

router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    if (checkPermission(req.user.roles, TYPE_OF_ADMIN)) {
      return res.redirect('/admin/delegates/checking')
    } else {
      return res.redirect('/admin/delegates/update-info')
    }
  } else {
    return redirectToLogin(res);
  }
});

require("./login")(router);

module.exports = router;
