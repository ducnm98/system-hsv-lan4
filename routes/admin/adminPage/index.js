var router = require('express').Router();

router.get("/", (req, res, next) => {
  res.render("admin");
});

module.exports = router;
