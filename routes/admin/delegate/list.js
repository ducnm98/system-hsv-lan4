var { redirectToLogin, success, successWithNoData } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');
var _ = require('lodash');

module.exports = router => {
  router.get("/", (req, res, next) => {
    if (req.isAuthenticated()) {
      let pageSize = parseInt(_.get(req, 'query.pageSize', 20));
      let skip = parseInt(_.get(req, 'query.skip', 0) * pageSize);
      mongoose.model('delegates').find().countDocuments().exec((err, total) => {
        if (err) throw err;
        mongoose.model('delegates').find().skip(skip).limit(pageSize).exec((err, delegatesList) => {
          if (err) throw err;
          if (delegatesList) {
            return res.render('admin/delegates', { total, skip, pageSize, delegatesList, roles: req.user.roles })
          } else {
            return res.render('admin/delegates', { total, skip, pageSize, delegatesList, roles: req.user.roles })
          }
        })
      })
    } else {
      return redirectToLogin(res)
    }
  });
};
