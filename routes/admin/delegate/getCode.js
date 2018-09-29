var { redirectToLogin } = require("../../../services/returnToUsers");

module.exports = router => {
  router.get("/get-code", (req, res, next) => {
    if (req.isAuthenticated()) {
      res.render("admin/delegates/getCode");
    } else {
      return redirectToLogin(res);
    }
  });
};
