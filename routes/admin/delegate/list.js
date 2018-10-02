var { redirectToLogin, success, successWithNoData } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');
var _ = require('lodash');
var { checkPermission } = require('../../../services/checkPermission');
var { TYPE_OF_ADMIN } = require("../../constants");

module.exports = router => {
  router.get("/", (req, res, next) => {
    if (req.isAuthenticated()) {
      if (checkPermission(req.user.roles, TYPE_OF_ADMIN)) {
        // let pageSize = parseInt(_.get(req, 'query.pageSize', 20));
        // let skip = parseInt(_.get(req, 'query.skip', 0) * pageSize);
        mongoose.model('delegates').find().countDocuments().exec((err, total) => {
          if (err) throw err;
          mongoose.model('delegates').find().exec((err, delegatesList) => {
            if (err) throw err;
            if (delegatesList) {
              return res.render('admin/delegates', { total, delegatesList, roles: req.user.roles })
            } else {
              return res.render('admin/delegates', { total, delegatesList, roles: req.user.roles })
            }
          })
        })
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res)
    }
  });
};
