var { redirectToLogin, success, successWithNoData } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');

module.exports = router => {
  router.get("/checking", (req, res, next) => {
    res.render("admin/delegates/checking");
    // if (req.isAuthenticated()) {
    // } else {
    //   return redirectToLogin(res);
    // }
  });

  router.put("/checking/:session/:id", (req, res, next) => {

  });
};
