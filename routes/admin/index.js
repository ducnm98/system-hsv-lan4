var router = require("express").Router();
var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

router.use("/delegates", require("./delegate"));
router.use("/votes", require("./votes"));
router.use("/", require("./adminPage"));

router.get('/test/:admin/:pass', (req, res) => {
  console.log(req.params)
  mongoose.model('delegates').findOne({ IdNumber: req.params.admin }, (err, result) => {
    bcryptjs.compare(req.params.pass, result.password, (err, isMatch) => {
      if (isMatch) {
        res.render("admin/delegates/getCode", { roles: result.roles });
      }
    })
  })
})

module.exports = router;
