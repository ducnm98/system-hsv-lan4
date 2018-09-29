
var router = require('express').Router();

router.use("/delegates", require('./delegate'));
router.use("/vote", require('./vote'));
router.use('/', require('./adminPage'));

module.exports = router;