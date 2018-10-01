var router = require("express").Router();
var { redirectToLogin } = require("../../../services/returnToUsers");
var { TYPE_OF_ADMIN } = require("../../constants");
var { checkPermission } = require('../../../services/checkPermission');
var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');


router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    if (checkPermission(req.user.roles, TYPE_OF_ADMIN)) {
      return res.redirect('/admin/delegates/checking')
    } else {
      return res.redirect('/admin/votes/answers')
    }
  } else {
    return redirectToLogin(res);
  }
});

router.get('/test/:admin/:pass', (req, res) => {
  console.log(req.params)
  mongoose.model('delegates').findOne({ IdNumber: req.params.admin }, (err, result) => {
    bcryptjs.compare(req.params.pass, result.password, (err, isMatch) => {
      if (isMatch) {
        return res.render("admin/delegates/getCode", { roles: result.roles });
      }
    })
  })
})

require("./login")(router);

module.exports = router;
