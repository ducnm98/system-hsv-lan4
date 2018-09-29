var passport = require('passport');


module.exports = router => {
  router.get("/login", (req, res, next) => {
    res.render("login");
  });
  
  //Method POST
  router.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true
    }),
    (req, res, next) => {
      req.session.cookie.maxAge = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Cookie expires after 30 days
      res.redirect("/admin");
    }
  );

}
