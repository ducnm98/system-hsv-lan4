var router = require("express").Router();

router.use("/delegates", require("./delegate"));
router.use("/votes", require("./votes"));
router.use("/", require("./adminPage"));

module.exports = router;
