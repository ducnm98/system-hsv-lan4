var router = require("express").Router();

require('./attendance')(router);
router.get('/', (req, res) => {
  res.render('homePage')
})

module.exports = router;
