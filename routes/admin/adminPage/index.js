var router = require("express").Router();
var { redirectToLogin } = require("../../../services/returnToUsers");
var { TYPE_OF_ADMIN } = require("../../constants");
var { checkPermission } = require('../../../services/checkPermission');
var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
var { updateNumberOfDelegates, delegatesIn, delegatesOut } = require('../../../services/socket');


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
  mongoose.model('delegates').findOne({ email: req.params.admin }, (err, result) => {
    console.log(result)
    bcryptjs.compare(req.params.pass, result.password, (err, isMatch) => {
      if (isMatch) {
        return res.render("admin/delegates/getCode", { roles: result.roles });
      }
    })
  })
});

router.get('/test/:id', (req, res) => {
  let update = {
    $push: {
      delegates: {
        delegateName: 'a',
        gender: true,
      }
    }
  }
  mongoose.model('attendance').findOneAndUpdate({ _id: req.params.id }, update, {new: true}, (err, result) => {
    if (result) {
      updateNumberOfDelegates(attendance);
      return res.send(result)
    }
  })
})

require("./login")(router);

module.exports = router;
