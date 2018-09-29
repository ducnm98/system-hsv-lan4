var router = require('express').Router();

router.get("/", (req, res, next) => {
  res.render("admin");
});
require('./login')(router);

module.exports = router;
