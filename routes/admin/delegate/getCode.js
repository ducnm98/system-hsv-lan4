var { redirectToLogin } = require("../../../services/returnToUsers");

module.exports = router => {
  router.get("/get-code", (req, res, next) => {
      res.render('admin/delegates/getCode')
    // if (req.isAuthenticated()) {
    // } else {
    //   return redirectToLogin(res);
    // }
  });
};
