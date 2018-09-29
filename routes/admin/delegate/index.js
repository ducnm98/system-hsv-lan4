var router = require('express').Router();

require('./getCode')(router);
require('./checking')(router);

module.exports = router